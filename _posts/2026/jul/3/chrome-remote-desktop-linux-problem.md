---
title: "Chrome Remote Desktop on Linux: Desktop Problems and Fixes"
description: "Troubleshoot Chrome Remote Desktop on Linux by fixing black screens, login loops, blank desktops, and session issues using Xorg and XFCE." 
date: 2026-07-02
tags: [linux, ubuntu] 
published: true
image: "crdl.png"
last_modified_at: 2026-11-07
---



Chrome Remote Desktop is one of the easiest ways to remotely access a computer. While the setup is straightforward on windows machine, there appear some issues such as black screens, login loops, or blank desktop sessions after connecting with linux systems.

These problems usually happen because of how Linux handles display servers.Chrome Remote Desktop on Linux does not simply mirror your existing physical desktop out of the box. Instead, it create new virtual session. If you are using Ubuntu restricts multiple concurrent sessions for the same user[^1]. The result? The virtual session crashes, gives black screen. Easy fix is to use XFCE without messing up main session.

 
 
```bash 
sudo apt install xfce4 xfce4-goodies
```
 

Now that XFCE is installed, we have to configure Chrome Remote Desktop to use it to connect remotely.
 

```bash
echo "exec /usr/bin/xfce4-session" > ~/.chrome-remote-desktop-session
```
 
You can now proceed to set up Chrome Remote Desktop as usual through the web interface. When you connect from your secondary device, you will be greeted by a clean, fully functional XFCE desktop environment, while your physical Linux machine continues to run your standard GNOME setup perfectly.

[^1]: You can create another user and use that separate account specifically for remote connections, but switching to XFCE on your main account is generally much more convenient for accessing your files.