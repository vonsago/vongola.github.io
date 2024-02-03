+++
author = "Ars"
title = "KMP code"
date = "2024-01-01"
description = ""
featured = false
categories = [
  "Algorithma"
]
images = [
  "images/bg/bgh1.jpg"
]
# toc = true
+++ 

```golang

func kmp(s, sub string) int {
	bu := make([]int, len(sub))
	// abcdabd
	for i, j := 1, 0; i < len(sub); i++ {
		for j > 0 && sub[j] != sub[i] {
			j = bu[j-1]
		}
		if sub[j] == sub[i] {
			j++
		}
		bu[i] = j
	}
	for i, j := 0, 0; i < len(s); i++ {
		if s[i] == sub[j] {
			j++
			if j == len(sub) {
				return i
			}
		} else {
			if j > 0 {
				j = j - (j - bu[j-1])
				i--
			} else {
			}
		}
	}
	return -1
}

func TestKmp(t *testing.T) {
	// kmp("BBC ABCDAB ABCDABCDABDE", "ABCDABD")
	var a []int
	var b chan int
	if a == nil {
		fmt.Print(a)
	} else {
		fmt.Print(b)
	}
}

```
