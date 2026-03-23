---
title: "GPU Memory Full On Idle"
image: "234261.png"
date: 2026-03-23  
tags: [nvidia, pytorch, cuda, linux]
description: "Why your GPU memory is full even when idle, and how to fix hidden processes and PyTorch DataLoader issues without rebooting."
---

I ran `nvidia-smi` and noticed GPU memory was almost completely full, but nothing was running. GPU usage was at 0%, no active jobs, yet nearly all VRAM was occupied. At first, I thought something was wrong with the GPU or drivers, but that wasn’t the case.


```Bash
$ nvidia-smi
Sun Mar 22 13:01:31 2026       

+---------------------------------------------------------------------------------------+
| NVIDIA-SMI 535.230.02             Driver Version: 535.230.02   CUDA Version: 12.2     |
|-----------------------------------------+----------------------+----------------------+
| GPU  Name                 Persistence-M | Bus-Id        Disp.A | Volatile Uncorr. ECC |
| Fan  Temp   Perf          Pwr:Usage/Cap |         Memory-Usage | GPU-Util  Compute M. |
|                                         |                      |               MIG M. |
|=========================================+======================+======================|
|   0  NVIDIA RTX A5500               Off | 00000000:B3:00.0 Off |                  Off |
| 30%   35C    P8              18W / 230W |  24172MiB / 24564MiB |      0%      Default |
|                                         |                      |                  N/A |
+-----------------------------------------+----------------------+----------------------+

+---------------------------------------------------------------------------------------+
| Processes:                                                                            |
|  GPU   GI   CI        PID   Type   Process name                            GPU Memory |
|=======================================================================================|
|    0   N/A  N/A      2749      G   /usr/lib/xorg/Xorg                           63MiB |
|    0   N/A  N/A      2805      G   /usr/bin/gnome-shell                          7MiB |
+---------------------------------------------------------------------------------------+
```

After Gooogling

I found ```sudo reboot``` works but as it multiuser machine I had to ask permission.

Further Gooogling

In my case, I had been running training jobs using `DataLoader(num_workers > 0)`. PyTorch spawns multiple worker processes (`pt_data_worker`) for faster data loading. The problem starts when a script crashes or I interrupt it using `Ctrl + C`. These worker processes don’t always terminate properly and continue running silently in the background, still holding GPU memory.
  
```Bash
$ sudo fuser -v /dev/nvidia* 

                     USER        PID    ACCESS COMMAND
/dev/nvidia0:        root       2749    F...m  Xorg
                     gdm        2805    F...m  gnome-shell
                     <user>     414634  F...m  pt_data_worker
                     <user>     414646  F...m  pt_data_worker
                     <user>     414647  F...m  pt_data_worker
                     <user>     415374  F...m  python

/dev/nvidiactl:      root       2749    F...m  Xorg
                     gdm        2805    F...m  gnome-shell
                     <user>     414634  F...m  pt_data_worker
                     <user>     414646  F...m  pt_data_worker
                     <user>     414647  F...m  pt_data_worker
                     <user>     415374  F....  python

/dev/nvidia-modeset: root       2749    F....  Xorg
                     gdm        2805    F....  gnome-shell

/dev/nvidia-uvm:     <user>     414634  F....  pt_data_worker
                     <user>     414646  F....  pt_data_worker
                     <user>     414647  F....  pt_data_worker
                     <user>     415374  F....  python
```


Solved. Now working for me 