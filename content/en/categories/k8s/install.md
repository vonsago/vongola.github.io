+++
author = "Ars"
title = "Install kubernetes(k8s) with kubeadm"
date = "2023-08-29"
description = "kubernetes"
featured = false
categories = [
  "Kubernetes"
]
tags = [
  "Kubernetes"
]
images = [
  "images/bg/bgh1.jpg"
]
# toc = true
+++


## Version Choise
__.ref https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/install-kubeadm/__

- kubeadm version:    &version.Info{Major:"1", Minor:"26", GitVersion:"v1.26.1", GitCommit:"8f94681cd294aa8cfd3407b8191f6c70214973a4", GitTreeState:"clean", BuildDate:"2023-01-18T15:56:50Z", GoVersion:"go1.19.5", Compiler:"gc", Platform:"linux/amd64"}
- docker Version:    20.10.12
- containerd:    1.6.18


## Prepare

```shell
# check swap off with free -m .ref https://kubernetes.io/zh-cn/docs/setup/production-environment/tools/kubeadm/install-kubeadm/
swapoff -a


# check port is available
nc 127.0.0.1 6443

# some host dependences
apt install socat conntrack

# Kubernetes package repositories 
sudo apt-get update
sudo apt-get install -y apt-transport-https ca-certificates curl

curl -fsSL https://pkgs.k8s.io/core:/stable:/v1.28/deb/Release.key | sudo gpg --dearmor -o /etc/apt/keyrings/kubernetes-apt-keyring.gpg
echo 'deb [signed-by=/etc/apt/keyrings/kubernetes-apt-keyring.gpg] https://pkgs.k8s.io/core:/stable:/v1.28/deb/ /' | sudo tee /etc/apt/sources.list.d/kubernetes.list

sudo apt-get update
sudo apt-get install -y kubelet kubeadm kubectl
sudo apt-mark hold kubelet kubeadm kubectl

# In China, user can use sources of aliyun
curl -s https://mirrors.aliyun.com/kubernetes/apt/doc/apt-key.gpg | apt-key add -
cat <<EOF >/etc/apt/sources.list.d/kubernetes.list
deb https://mirrors.aliyun.com/kubernetes/apt/ kubernetes-xenial main
EOF
apt-get update
apt-get install -y kubelet kubeadm kubectl

# Install crictl
VERSION="v1.26.0"
wget https://github.com/kubernetes-sigs/cri-tools/releases/download/$VERSION/crictl-$VERSION-linux-amd64.tar.gz
sudo tar zxvf crictl-$VERSION-linux-amd64.tar.gz -C /usr/local/bin
rm -f crictl-$VERSION-linux-amd64.tar.gz

# Prepare config file for kubelet
RELEASE_VERSION="v0.4.0"
curl -sSL "https://raw.githubusercontent.com/kubernetes/release/${RELEASE_VERSION}/cmd/kubepkg/templates/latest/deb/kubelet/lib/systemd/system/kubelet.service" | sed "s:/usr/bin:${DOWNLOAD_DIR}:g" | sudo tee /etc/systemd/system/kubelet.service
sudo mkdir -p /etc/systemd/system/kubelet.service.d
curl -sSL "https://raw.githubusercontent.com/kubernetes/release/${RELEASE_VERSION}/cmd/kubepkg/templates/latest/deb/kubeadm/10-kubeadm.conf" | sed "s:/usr/bin:${DOWNLOAD_DIR}:g" | sudo tee /etc/systemd/system/kubelet.service.d/10-kubeadm.conf
```

## Install

```shell
kubeadm init --image-repository registry.cn-hangzhou.aliyuncs.com/google_containers --service-cidr=10.96.0.0/16 --pod-network-cidr=10.244.0.0/16  --v=5

# if Your Kubernetes control-plane has initialized successfully!
kubectl get node
NAME          STATUS   ROLES           AGE   VERSION
bvc-smt-004   Ready    control-plane   30m   v1.26.1

crictl ps|grep kube or docker ps|grep kub

# The join node token needs to be regenerated after it expires in 24h.
# openssl x509 -in /etc/kubernetes/pki/ca.crt -noout -pubkey | openssl rsa -pubin -outform DER 2>/dev/null | sha256sum | cut -d' ' -f1
kubeadm token create --print-join-command
kubeadm join 10.23.34.45:6443 --token xxx --discovery-token-ca-cert-hash shar:123

# Test pod
cat hello.yaml
apiVersion: v1
kind: Pod
metadata:
  name: hello-pod
  labels:
    app.kubernetes.io/name: MyApp
spec:
  containers:
  - name: hello-pod
    image: busybox:1.28
    command: ['sh', '-c', 'echo The app is running! && sleep 20']

kubectl apply -f hello.yaml

# Install CNI
calico https://docs.tigera.io/calico/latest/getting-started/kubernetes/quickstart

```

## Troubleshooting & Resolution
### there are many init fail when check kubelet status
`systemctl status kubelet`

`journalctl -xu kubelet`

`crictl ps` check contained if is ready

if the error log is about endpoint, try modify /etc/systemd/system/kubelet.service.d/10-kubeadm.conf（you can find template in k8s official website）

ExecStart=/usr/bin/kubelet --container-runtime-endpoint=unix:///run/containerd/containerd.sock $KUBELET_KUBECONFIG_ARGS $KUBELET_CONFIG_ARGS $KUBELET_KUBEADM_ARGS $KUBELET_EXTRA_ARGS

And in no-control-plane nodes, kubeadm reset -f before kubeadm join if you have executed kubeadm init

### containerd 状态失败
runtime connect using default endpoint

crictl config runtime-endpoint unix:///run/containerd/containerd.sock

or update containerd
## apt rm containerd ## apt install containerd && rm /etc/containerd/config.toml && containerd config default > /etc/containerd/config.toml && systemctl restart containerd 

### 关闭交换区
swapoff -a

### update recv-key
apt-key adv --keyserver keyserver.ubuntu.com --recv-keys 40976EAF437D05B5


### install kubeadm，kubelet，kubectl offline
RELEASE=v1.26.1
ARCH="amd64"
curl -L --remote-name-all https://storage.googleapis.com/kubernetes-release/release/${RELEASE}/bin/linux/${ARCH}/{kubeadm,kubelet,kubectl}

mv kube* /usr/local/bin && chmod +x /usr/local/bin/kube*


### HTTP call equal to 'curl -sSL http://localhost:10248/healthz' failed with error:
added docker config file '/etc/docker/daemon.json' and added below to the file.
{
"exec-opts": ["native.cgroupdriver=systemd"]
}

镜像仓库没有偷传到下面
resolve image pull fail with agent, `kubeadm config images pull --image-repository registry.aliyuncs.com/google_containers` ## use containerd need tag crictl images, special `pause` ## ctr --namespace=k8s.io image tag registry.aliyuncs.com/google_containers/pause:3.9 registry.k8s.io/pause:3.9 

or edit /etc/containerd/config.toml 


### Containerd harbor config
config harbor of hub.xxx.co with name: xxx

```toml
[plugins."io.containerd.grpc.v1.cri".registry]

      [plugins."io.containerd.grpc.v1.cri".registry.mirrors]

        [plugins."io.containerd.grpc.v1.cri".registry.mirrors."docker.io"]

          endpoint = ["https://registry-1.docker.io"]

        [plugins."io.containerd.grpc.v1.cri".registry.mirrors."hub.xxx.co"]

          endpoint = ["https://hub.xxx.co"]

      [plugins."io.containerd.grpc.v1.cri".registry.configs]

        [plugins."io.containerd.grpc.v1.cri".registry.configs."hub.xxx.co".tls]

          insecure_skip_verify = true

          #ca_file = "/etc/containerd/certs.d/registry.harbor.com/ca.crt" #ca证书

          #cert_file = "/etc/containerd/certs.d/registry.harbor.com/registry.harbor.com.cert" #harbor证书

          #key_file = "/etc/containerd/certs.d/registry.harbor.com/registry.harbor.com.key" #密钥

        [plugins."io.containerd.grpc.v1.cri".registry.configs."hub.xxx.co".auth]

          username = "xxx"

          password = "xxxxxx"
```


### Control-plane can schduler pod
kubectl taint node xxx node-role.kubernetes.io/control-plane-

rollback: kubectl taint node xxx node-role.kubernetes.io/control-plane:NoSchedule


### couldn't get current server API group list on node
cp -i /etc/kubernetes/admin.conf $HOME/.kube/config

chown $(id -u):$(id -g) $HOME/.kube/config

Check sock

`tr \\0 ' ' < /proc/"$(pgrep kubelet)"/cmdline`


### CNI
kubeadm reset
systemctl stop kubelet
rm -rf /var/lib/cni/
rm -rf /var/lib/kubelet/*
rm -rf /etc/cni/
ifconfig cni0 down
ifconfig flannel.1 down
ip link delete cni0
ip link delete flannel.1
systemctl start kubelet

bin缺少
https://github.com/containernetworking/plugins/releases

install calico 

### DNS 问题 （条目不能超过3）
systemctl status systemd-resolved

cat /etc/systemd/resolved.conf

cat /etc/resolved.conf


### plugin type="flannel" failed (add): open /run/flannel/subnet.env: no such file or directory
try  `rm -f /etc/cni/net.d/*flannel* `


### dashboad baretoken
https://github.com/kubernetes/dashboard/blob/master/docs/user/access-control/creating-sample-user.md


### Kubeadmin join throws this error “/proc/sys/net/bridge/bridge-nf-call-iptables does not exist”

```
modprobe br_netfilter
echo 1 > /proc/sys/net/bridge/bridge-nf-call-iptables
echo 1 > /proc/sys/net/ipv4/ip_forward
```
