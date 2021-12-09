---
title: 'ADG cairo canvas'
description: 'What is the ADG canvas, why it has been developed and how should be used'
---
The ADG library (Automatic Drawing Generation) is a set of functions focused on
automating the drawing of mechanical parts.

When different parts share a similar shape, a custom application can be much
more effective than the traditional way of manually drawing every part with a
CAD. In some production factories, such as the automotive sector, this is quite
common. Nozzles, elements, nuts, valves, needles and a lot of other parts fall
into this category.

You can reach similar targets by using parametric CADs, but a custom
application provides the following benefits:

* **more extensible**\
  you are not tied to a single interface nor forced to interact with the user:
  you have a lot of ways for feeding the same application logic;
* **more customizable**\
  if you have to create an application from the ground: you can do whatever you
  want;
* **not so bloated as a parametric CAD**\
  this honestly depends on the application but, talking in general, ADG doesn't
  have a lot of stuff a CAD system must have, such as a GUI for user
  interactions;
* **can be easily connected to a database**\
  the model-view separation greatly improves the connectivity of the
  application;
* **the drawings can be generated on the fly**\
  the canvas does not enforce user interaction: this feature can be used in a
  dynamic site or in a web-based application by automatically generating the
  drawing only when the page is accessed, giving an always up to date website.

Although ADG is developed in C using an object-oriented approach, the
applications based on it are expected to be developed using higher-level
languages and especially garbage-collected ones.

Its components (such as model handling, user interface support and drawing
customization) are fully decoupled, making possible for instance to build the
project on a headless server for web applications support. Check out the
Technical details page for further information.

The project is cross-platform. It is known to build on various flavour of
GNU/Linux systems (Archlinux, Slackware and Ubuntu), FreeBSD, OpenSolaris and
Windows XP (either by cross-compiling from GNU/Linux systems or by natively
building it on a MinGW environment).
