---
title: 'Downloading the ADG'
description: 'Where the ADG canvas can be downloaded and where to find the source code repository'
---

The bug tracker and a repository browser could be accessed online at the ADG
development site. For further details, requests for comments or nasty spelling
errors on this site, feel free to use the mailing list or to submit a new issue
in the tracker (both of them require registration).

## License

The Automatic Drawing Generation library is released under the terms of the
LGPL 2.1 license. This choise was made to be compatible with the underlying
libraries, all of them availables under the LGPL.

## Backward compatibility

Application programming and binary interfaces (API and ABI) are monitored for
issues on every release. This service is kindly provided by ABI laboratory:
kudos to Andrey Ponomarenko for the help.

## Prerequisites/dependencies

The ADG library is based on the following software packages:

* GLib 2.10.1 or later [required]
* GLib, together with the embedded GObject library, provides object oriented
  programming layer to plain C, binding facilities, commonly used data
  structures and more.
* cairo 1.7.4 or later [required]
* The core of the ADG project: a 2D rendering engine with multiple backends,
  such as x11, png, pdf, ps and svg.
* Pango 1.18.0 or later [optional]
* Pango, and more specifically pangocairo, is used for serious rendering by the
  AdgText entity.
* GTK+ 2.8.0 or later [optional]
* Used by the demo program to provide something watchable.

The [required] dependencies are mandatory and should be installed before the configuration phase. All these packages should be installed along with their development version if your distribution differentiates between runtime and development flavours.

## Ready packages

The ADG project tries to not privilege any platform, so there are no offically
supported distributions. Hence the following list is a collection of
spontaneous links found around the web.

Frugalware
: The package can be found in the lib-extra group.
Mac OS X
: The Fink project is maintaning a package for development stuff (docs and
  headers) and another one for runtime stuff (shared libraries).
ArchLinux
: There is a dedicated page in the AUR repository.
Windows
: This is a special case and binary releases can be found on the SourceForge
  download page. These releases are managed internally because, honestly,
  building adg-demo for windows is a royal PITA and there are tons of things
  that can go wrong (and that usually do).

Alternatively the library has been included in the All-In-One package of the
porting of PyGObject to win32 platforms.

If you are aware of some ADG package or want to work on one of them, please
drop a line in the relevant thread of the tracker or notify it on the mailing
list.

## Building from the sources

When no binary packages are available or if you need to tweak some option or
simply want to play with the code, there is the (almost) ever working approach
of building the package by yourself. Being the developers the target audience
of the ADG project, building from sources will be the best supported approach
in any case.

Issues and hints found on some platform are reported in the Screenshot page.
The following sections should be considered more like suggestions than
instructions.

### Getting the sources

You can get the sources in two ways: the former is by downloading a prepackaged
source tarball and the latter is by directly fetching the sources from the
repository.

The source tarball is the simplest method, because it is packaged in a
(hopefully) buildable state and requires only the dependencies cited above. In
most cases, this is the way to go.

Fetching the sources from the repository is reserved for ADG developers or
advanced users. Sometimes it is also useful for getting a bleeding edge version
that provides a recently implemented feature not yet released throught
tarballs. Building using this approach requires the whole autotools
infrastructure in place though.

### Using a source tarball

The ADG source tarballs are hosted by SourceForge: just download the latest
.tar.bz2 archive, usually located on the top of the page, somewhere on your
home directory and unpack it.

For example, from the shell you could do something like this (use the correct
version number instead of 0.6.0):

```bash
wget http://sourceforge.net/projects/adg/files/adg/0.6.0/adg-0.6.0.tar.bz2/download
tar xjvf adg-0.6.0.tar.bz2
cd adg-0.6.0
```

### Fetching from a git repository

The ADG source code is managed by git, a distribuited version control system
with strong support for non-linear development.

Actually, there are three availables public repositories hosting the bleeding
edge version: they can be found at SourceForge, repo.cz and Gitorious.

The first time you fetch the sources, the whole repository should be cloned.
Here is an example on how to clone the repository from SourceForge:

```bash
git clone git://adg.git.sourceforge.net/gitroot/adg/adg
cd adg
```

Subsequent fetches need only to update the repository, so you should be able to
do something like:

```bash
cd adg
git pull
```

This will pull in only recent changes, so it will be a lot faster than the git
clone.

### Compilation

Firstly, the build process must be configured. If the sources have been fetched
from the source repository, you should use ./autogen.sh instead of ./configure
(they accept the same options though):

```bash
./configure
make
```

There are a lot of options you could pass to ./configure to customize the
build, such as forcibly enable or disable some feature instead of relying on
automatic discovery. Check the output of `./configure --help` for hints.

If everything built fine, you are now able to run the demo program. There is no
need to install the library to do that:

```bash
demo/adg-demo
```

Running the `adg-demo` program is a great way to check that everything work fine.

### Installing the libraries

You need enough privileges to access the destination directory for writing.
This directory can be set at the configuration phase with the --prefix option
and it defaults to /usr/local on most systems. This usually means you need root
privileges, so you should log in as root before running the following command
or use whatever provided by your distribution to gain root privileges (such as
prefixing the command with sudo in Ubuntu or with pfexec in OpenSolaris):

```bash
make install
```

At the end of this stage, three shared libraries (libcpml-1.so, libadg-1.so and
libadg-gtk-1.so, or their equivalents for the target platform) will be copied
in the library directory. C headers and pkg-config helper files will be
installed in the proper place.
