---
title: 'History behind the ADG'
description: 'How the automatic drawing generation idea is far older then the ADG project itself'
---
The ADG development started in 2007 but the idea of automatically generate
technical drawings from a bunch of data can be dated back to the mid-nineties.
At that time I was employed as a technician in a manufacturing center producing
nozzles. A good amount of time was dedicated to using a CAD software for
generating the technical drawings required by the different departments.

These drawings were mostly the same and, although I initially tried to use the
CAD for every single drawing, I ended up (as my predecessors) with whiteout and
pencils. Using the CAD software was simply too time consuming and the process
of looking for a similar nozzle, open every drawing of that part, stretch the
wires, adjust the quotes and check the final result was (by far) too error
prone.

## The grandfather
![SuperBase application for diesel nozzle management, 1994](img/sb01.jpeg)

This was the first (and technically successful) attempt in resolving the
drawing problem. Today it is still used in only one installation because it has
been superseded by a more recent rewrite from scratch that used the same
approach but with more up to date tools (that is, the father).

The software is monolithic and developed with Superbase 95, a RAD database very
similar in use and scope to Microsoft Access. The choice was made not for
technical reasons but because Superbase was already used internally, hence it
was immediately available.

Big chunks of the code were devoted to the definition of tables and forms for
handling the interaction with the user. The overall structure strictly followed
the needs of the moment and the production procedures to minimize the impact of
the software on the real world. Even the grouping of the data followed the
mechanical machinings performed on the parts.

To speed up the input of ecpected (for a single part there were about 300
values required) a family approach was used, that is a set of values identified
by metadata that allowed to automatically fill up whole forms.

![Automatic drawing generation of the body of a diesel nozzle, 1994](img/sb02.jpeg)

The drawing was generated in DXF format using the text file manipulation APIs
provided by the Superbase scripting language. The resulting file was then
imported in the user interface through the DXF filter (technically a DLL
library) installed as an option by the database installer. After the import,
the drawing was shown on the screen, ready to be printed.

Every generation cycle required about 5 seconds. The DXF files were stored in a
dedicated directory: this allowed to reopen the generated drawing with a CAD
software to modify it in a second time, for instance to add an unusual
machining not planned in the drawing application.

Once the data was stored in the database, SQL queries can be performed on them,
allowing to executing interesting operations on that set of data. For example,
I got a list of nozzles with a specific diameter or with a particular tip in
seconds instead of hours, and minimizing the risk of errors. Furthermore I
standardized some quotes to reduce the setup time and increase the productivity
by running a serie of planned UPDATE queries.

![Automatic drawing generation of the holes of a diesel nozzle, 1994](img/sb02.jpeg)

Another (not so) hidden advantage of this approach is that a single data set
can generate more than one drawing. In this specific application 7 drawings
were generated, following the requirements advanced by the production lines and
by the sales department. For example a special drawing table was generated fot
the drilling machines that included some metadata and a dedicated table
directly filled with the data the operator should insert into the machines.

In the form used for inserting the drilling data was present a special command
that connected the application with an external equipment used to acquire the
holes angles. This allowed to get the values of the angles directly from that
devices instead of typing them with the keyboard. The communication was done by
using the Hitachi H-Series protocol over a serial line between the PC and the
PLC of the external equipment.

## The father
![Microsoft Access application for diesel nozzle management, 2001](img/access.jpeg)

When the need to update the PC arose, the limits of the platform chosen came to
light. It was clear Superbase was not a winning choice and the DXF filter, a
requirement for this kind of applications, was no more included in the
installer. The rate of adoption of Microsoft Access over Superbase was an order
of magnitude faster so it has been decided to rewrite the software from scratch
using Microsoft Access 2000. That database has an (optional) DXF filter
included in the installer. I must add to my defense that I wanted to use more
professional tools for the job (such as using web technologies on a LAMP
platform) but money constraints and scepticism got in the way, so I have been
forced to use Access.

Although the scripting language and the overall design were quite similars,
this job required quite a big amount of time because the details, such as forms
and UI signal handling, were totally differents. The scripting language was VBA
(VisualBasic for Application, that is VisualBasic 6 embedded). Although
inadecuate for large projects (e.g. its idea of object oriented is, mildly put,
laughable), the operations to do were quite basics so it has been proved good
enough for that job.

Everything has been rewritten from the ground up but the interaction of the
application with the equipment for acquiring holes angles. This would have
required the port of the Hitachi protocol to the new platform but non-technical
issues once again interfered with the application development.

## Born of ADG
![A tool for generating technical drawings, 2007](img/adg-demo-0.6.0.png)

The experience acquired while implementing the previous applications and the
fact I wanted to prove using a LAMP platform was technically superior in every
aspect brought me to the development of the ADG.

These are the main issues I encountered, roughly in (my subjective) order of
importance.

* The system is not portable and it is totally based on proprietary software,
  making it a giant with feet of clay.
* These applications are rigid, quite useless outside that factory context.
* The drawings depends on the DXF file format: no DXF, no party. If you need to
  show a drawing you need a DXF viewer, that is a not so widespread program,
  nor a web format.
* The drawing generation speed, although improved by the father application, is
  damn slow.

In the design of the ADG I tried to address every item.

* The ADG library is based on GLib and cairo, two open source projects I expect
  to be around for a long time. Even the GTK support is optional.
* The ADG project only provides the canvas for generating the drawings, not an
  application that generates a specific drawing. Great care has been taken to
  make the project as scriptable as possible, to low the barrier for the real
  application development.
* The cairo library is able to handle different image formats. Above all, PNG
  and PDF makes the resulting drawings suitable for web applications.
* The drawing generation is performed at C level, hence compiled. This means it
  is some order of magnitude faster than the parent applications here
  described.

The only missing thing I see in the current implementation (and this can be a
big one, depending on your requirements) it is the missing support to the DXF
format.
