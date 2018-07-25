## Install Geonode 2.8 on OSX (python 2.7.10)

```terminal
$virtualenv geonode2.8
$cd geonode2.8 && source bin/activate
$git clone https://github.com/sud0su/isdc-tmp.git
$pip install -r requirements.txt
$pip install -e .
$paver reset_hard
$rm -Rf geoserver
$rm -Rf downloaded/*.*
```

>- rename local_settings.py.geoserver.sample to local_settings.py
>- edit database name, user, and password
  
```terminal
$pip install GDAL==$(gdal-config --version | awk -F'[.]' '{print $1"."$2}’)
- paver setup
```

> Fix = raise GEOSException('Could not parse version info string "%s"' % ver)
>- Edit this file: site-packages/django/contrib/gis/geos/libgeos.py 
>- Look for the function: geos_version_info  
>    - And change this line:
>    - `ver = geos_version().decode()`
>    - With this line:
>    - `ver = geos_version().split(' ')[0]`
  
>Fix = ImportError: cannot import name GeoIP
> - brew install geoip

```terminal
$paver sync (sync db)
$paver start (start django and geoserver)
$paver stop (stop django and geoserver)
```

### install node

```terminal
$brew install node
$node -v
$npm -v
$npm install
```