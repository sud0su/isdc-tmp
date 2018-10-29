# First Step

## Installation
`virtualenv isdc`<br/>
`cd isdc && source bin/activate`<br/>
`git clone https://github.com/sud0su/isdc-tmp.git`<br/>
`pip install -r requirements.txt`<br/>
`pip install -e .`<br/>
`paver reset_hard`<br/>
`rm -Rf geoserver` <br/>
`rm -Rf downloaded/*.*`

>- rename `local_settings.py.geoserver.sample` to `local_settings.py`
>- edit database name, user, and password
  
`pip install GDAL==$(gdal-config --version | awk -F'[.]' '{print $1"."$2}’)`<br/>
`paver setup`


> Fix = raise GEOSException('Could not parse version info string "%s"' % ver)
>- Edit this file: site-packages/django/contrib/gis/geos/libgeos.py 
>- Look for the function: geos_version_info  
>    - And change this line:
>    - `ver = geos_version().decode()`
>    - With this line:
>    - `ver = geos_version().split(' ')[0]`
  
>Fix = ImportError: cannot import name GeoIP
> - brew install geoip

`paver sync` (sync db)<br/>
`paver start` (start django and geoserver)<br/>
`paver stop` (stop django and geoserver)

## Integration

edit file `activate` in `{environment}\bin` folder and at the bottom of code add this code: 
```
export PYTHONPATH=${VIRTUAL_ENV}/lib/isdc-modules/:${VIRTUAL_ENV}/lib/isdc-modules/:\
${VIRTUAL_ENV}/lib/isdc-modules/isdc_geodb/:\
${VIRTUAL_ENV}/lib/isdc-modules/isdc_dashboard/:\
${VIRTUAL_ENV}/lib/isdc-modules/isdc_matrix/:\
${VIRTUAL_ENV}/lib/isdc-modules/isdc_pushnotif/:\
${VIRTUAL_ENV}/lib/isdc-modules/isdc_securitydb/:\
${VIRTUAL_ENV}/lib/isdc-modules/isdc_userstatistics/:\
${VIRTUAL_ENV}/lib/isdc-modules/isdc_uploadpdf:\
${VIRTUAL_ENV}/lib/isdc-modules/isdc_flood/:\
${VIRTUAL_ENV}/lib/isdc-modules/isdc_avalanche/:\
${VIRTUAL_ENV}/lib/isdc-modules/isdc_accessibility/:\
${VIRTUAL_ENV}/lib/isdc-modules/isdc_earthquake/:\
${VIRTUAL_ENV}/lib/isdc-modules/isdc_landslide/:\
${VIRTUAL_ENV}/lib/isdc-modules/isdc_securityincident/:\
${VIRTUAL_ENV}/lib/isdc-modules/isdc_naturaldisaster/:\
${VIRTUAL_ENV}/lib/isdc-modules/isdc_climate/:\
${VIRTUAL_ENV}/lib/isdc-modules/isdc_weather/:\
${VIRTUAL_ENV}/lib/isdc-modules/isdc_drought/
```

> create folder `isdc-module` in `{environment}\lib` folder and download a isdc module package [Download Package](https://www.dropbox.com/s/48m8q3j52eowokq/isdc_modules.tar.gz?dl=0) then extract inside the isdc-module folder.

> create a database with a name `geodb` and `securitydb`, then add new extension with a name `postgis` and `plpgsql` as a superuser.

#### Create database

GeoDB

```
CREATE DATABASE geodb
  WITH OWNER = postgres
       ENCODING = 'UTF8'
       TABLESPACE = pg_default
       LC_COLLATE = 'C'
       LC_CTYPE = 'C'
       CONNECTION LIMIT = -1;
```

Securitydb

```
CREATE DATABASE security_data
  WITH OWNER = postgres
       ENCODING = 'UTF8'
       TABLESPACE = pg_default
       LC_COLLATE = 'C'
       LC_CTYPE = 'C'
       CONNECTION LIMIT = -1;
```

#### Create Extension

Create extension for new db (`geodb` and `securitydb`)

Plpgsql

```
 CREATE EXTENSION plpgsql
  SCHEMA pg_catalog
  VERSION "1.0";
```

Postgis
```
 CREATE EXTENSION postgis
  SCHEMA public
  VERSION "2.1.8";
```