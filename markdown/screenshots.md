---
title: 'Screenshots and hints'
description: 'Hints and suggestions on how the ADG cairo canvas can be deployed on different operating systems'
---
On each section it is reported a rough description of the issues met while
building the ADG on that specific platform. The eventual commands reported
should be taken with a grain of salt; they are shown only for reference purpose
and as a copy&paste commodity. Your distribution could be totally different
from the one used in the test.

## GNU/Linux
![adg-demo 0.6.0 running on Arch linux 64](img/adg-demo-0.6.0.png)

Actually the ADG is developed on this platform, so there should be no problems
in building either from a tarball or from a fresh git checkout. Just fulfill
the requirements and follow the usual instructions (./autogen to regenerate the
build system from a git clone and ./configure && make && sudo make install to
build and install). GObject introspection and gtk-doc documentation are
included in the tarball, so there is no need to rebuild them.

The screenshot is taken from adg-demo running on an Arch linux 64 distribution
with the murrine GTK+ engine, a custom set of icons based on the nuvola theme
and the OpenBox window manager.

## FreeBSD
![adg-demo 0.6.0 running on FreeBSD 8](img/adg-demo-0.6.0-FreeBSD8.png)

Some build component, specifically the i18n part and the shave tool, requires
GNU make so gmake must be used instead of make. This means the only mayor
difference from a GNU/Linux system is the use of a csh based shell instead of
GNU bash.

Keeping the build compatible with FreeBSD is a matter of not relying on
bashism. This gives the advantage that the ADG could be easily included as-is
in the FreeBSD port system.

As from version 0.6.3, there are no known issues on FreeBSD: either the tarball
and a git checkout build fine and all the tests pass successfully, making this
a good platform for ADG development.

For convenience here are the commands used to build the ADG on FreeBSD:

```bash
su -
pkg_add -r gnome2-lite gtk-doc autotools
exit
git clone git://adg.git.sourceforge.net/gitroot/adg/adg
./autogen.sh
gmake
demo/adg-demo
```

FreeBSD does not come with a set of packages preselected: it is a minimal
distribution with tons of customization variants. The above commands work for a
FreeBSD 8.2 installed with the Development category preselected.

## Open solaris
![adg-demo 0.6.0 running on OpenSolaris 2009.6](img/adg-demo-0.6.0-OpenSolaris2009.png)

ADG builds just fine from a tarball and from a git checkout. As in FreeBSD, the
make check target does not pass because of the same mathematical rounding
problems.

OpenSolaris is another viable platform for ADG development purpose. Resolved
the rounding problem it would be as effective as a GNU/Linux platform.

In the following, the commands used on a bare OpenSolaris 2009.6 installation
to build and run adg-demo from a fresh git checkout. OpenSolaris does not
provide a standard automake and aclocal binary, so they must be explicitely set
using the proper environment variable at configure time:

```bash
pfexec pkg install SUNWgit SUNWgcc \
    SUNWlibtool SUNWaconf SUNWgnu-automake-110 \
    SUNWgnome-common-devel SUNWxorg-headers
git clone git://adg.git.sourceforge.net/gitroot/adg/adg
cd adg
AUTOMAKE=automake-1.10 ACLOCAL=aclocal-1.10 ./autogen.sh
make
demo/adg-demo
```

## Open indiana

This operating system seems to be a sane continuation of the now dead
OpenSolaris project.

With some minor differences, the OpenSolaris instructions also applies here.
For reference, the following commands have been used to compile a fresh git
checkout of the ADG with the SunStudio C compiler:

```bash
git clone git://adg.git.sourceforge.net/gitroot/adg/adg
cd adg
CC=/opt/SunStudioExpress/bin/cc AUTOMAKE=automake-1.10 ACLOCAL=aclocal-1.10 ./autogen.sh
make
demo/adg-demo
```

There are still some test failing, though. More investigation is required...

## Windows
![adg-demo 0.6.0 running on Windows XP](img/adg-demo-0.6.0-MingW.jpeg)

The current build system is able to cross-compile the project from a properly
configured GNU/Linux system and build an installer using the NSis tool. A
couple of wrappers under the build directory are provided for building win32
and/or win64 binaries. The actual system used for generating the installer on
SourceForge is based on the Fedora MinGW w64 toolchain ported to Archlinux.

Binaries got by cross-compilation can either be tested on GNU/Linux by using
wine. I'm investigating the possibility to use wine also for testing purpose
(make distcheck).


Previously, the old porting to Windows XP (and other win32 based platforms) has
been performed by using the MinGW32 environment. Building was done directly on
a windows system, a poor choice for a project based on autotools, making it a
suboptimal platform for ADG development purpose. The last easy-to-install
package, MSys-1.0.11, did not provide the minimum autotools required so only
source tarballs could be compiled in this way. Furthermore the building process
was painfully slow.

The adg-demo shown in the screenshot has been built natively on a Windows XP
platform by installing:

* MinGW 5.1.6
* MSys 1.0.11
* MSys Core 1.0.12
* MSys Development Toolkit 1.0.1
* GTK+ 2.16.6 all-in-one bundle
