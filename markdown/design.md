---
title: 'Technical overview'
description: 'Advantages and disadvantages between desktop and web-based applications'
---
Stressing it once more, the ADG library is a tool that a custom application
(that needs to be developed) can use.

In general, applications using the ADG canvas can be split in two main
categories: desktop or web based. Desktop application are better suited for
enhanced user experience while web application are stronger in data sharing and
integration with already existing infrastrutures.

## Destktop
![Design of an ADG based desktop application](img/desktop.png)

A typical desktop application does not involve traffic across networks and
usually provides better user experience because of this speed gain. This kind
of applications are easier to implement (do not have concurrent access to the
data) and to deploy. On the other side, there is no data sharing so the
equation one user : one PC : one program must be fulfilled. Furthermore the
software is usually bound to the platform used for development.

The application must interact with the hardware and the database using its own
preferred methods and tools: the ADG does not enforce any choice on this side.
On the other hand, the data flow on drawing generation is one-way: the
application generates the drawing by calling the ADG API and the result can be
put on screen (using the xlib backend) or can generate a PDF or PS file, ready
for the printer.

Also the programming language to use is not enforced (or, better said, is left
as free as possible). Special care has been taken to give the maximum
bindingability to the ADG project using the current available technologies.

## Web based
![Design of an ADG based web application](img/web.png)

Web applications provide natural data sharing and multiplatform support. They
are typically based on the technologies used for web development, such as LAMP
platforms, so they are ready to be integrated with already existing web
infrastructures.

A web application does not usually need to interact with real hardware so it
tends to be more abstract than its desktop counterpart. It only has to generate
web content, typically HTML, CSS and javascript files, and passes them to the
web server.

The interaction with the ADG library instead is similar (if not equal) to that
of a desktop application: at the end the canvas will generate a bunch of binary
files that will be referred by the HTML code generated by the application.

On the client side any device capable of web browsing can be used to access the
application and eventually get the drawings. The application should implement
its own authentication and authorization mechanism, especially if internet is
involved in some ring of the chain.

A sample bare web application is available. Technical details on the
implementation (and the source code of every piece used) can be found online.