
+++
author = "Ars"
title = "Goroutine Pool"
date = "2023-08-29"
description = "Golang Notes"
featured = false
categories = [
  "Golang"
]
images = [
  "images/bg/go.png"
]
# toc = true
+++



package test

import (
	"fmt"
	"runtime"
	"testing"
	"time"
)

type PPool struct {
	EntryChan chan func() error
	JobChan   chan func() error
	WorkNum   int
}

func NewPPool(cap int) *PPool {
	p := PPool{
		EntryChan: make(chan func() error),
		JobChan:   make(chan func() error),
		WorkNum:   cap,
	}
	return &p
}

func (p *PPool) worker(wId int) {
	for t := range p.JobChan {
		err := t()
		fmt.Println("workerId", wId, "执行任务成功")
		if err != nil {
			fmt.Println(err)
		}
	}
}

func (p *PPool) Receive(t func() error) {
	p.EntryChan <- t
}

func (p *PPool) Run() {
	for i := 0; i < p.WorkNum; i++ {
		go p.worker(i)
	}
	for t := range p.EntryChan {
		p.JobChan <- t
	}
	close(p.JobChan)
	close(p.EntryChan)
}

func TestPool(t *testing.T) {
	tt := func() error {
		fmt.Println(time.Now())
		return nil
	}

	p := NewPPool(3)
	go func() {
		i := 1
		for {
			p.Receive(tt)
			i++
		}
	}()
	p.Run()
}

func loop(num int, quit chan int) {
	for i := 0; i < 10; i++ {
		runtime.Gosched()
		fmt.Printf("%d-%d\n", num, i)
	}
	quit <- 0
}

func TestGo(t *testing.T) {
	fmt.Println(runtime.NumCPU())
	var quit chan int = make(chan int)
	go loop(1, quit)
	go loop(2, quit)
	go loop(3, quit)

	for i := 0; i < 3; i++ {
		<-quit
	}
}

