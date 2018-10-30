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

> create folder `isdc-modules` in `{environment}\lib` folder and download a isdc module package [Download Package](https://www.dropbox.com/s/48m8q3j52eowokq/isdc_modules.tar.gz?dl=0) then extract inside the isdc-module folder.

> Clone optional ISDC module from https://github.com/dodiws/ to ${VIRTUAL_ENV}/lib/isdc-modules/ folder accordingly

> Example:
```
cd ${VIRTUAL_ENV}/lib/isdc-modules/
git clone https://github.com/dodiws/isdc_dashboard.git isdc_dashboard
git clone https://github.com/dodiws/isdc_geodb.git isdc_geodb
git clone https://github.com/dodiws/isdc_dashboard.git isdc_dashboard
git clone https://github.com/dodiws/isdc_matrix.git isdc_matrix
git clone https://github.com/dodiws/isdc_pushnotif.git isdc_pushnotif
git clone https://github.com/dodiws/isdc_securitydb.git isdc_securitydb
git clone https://github.com/dodiws/isdc_userstatistics.git isdc_userstatistics
git clone https://github.com/dodiws/isdc_uploadpdf.git isdc_uploadpdf
git clone https://github.com/dodiws/isdc_flood.git isdc_flood
git clone https://github.com/dodiws/isdc_avalanche.git isdc_avalanche
git clone https://github.com/dodiws/isdc_accessibility.git isdc_accessibility
git clone https://github.com/dodiws/isdc_earthquake.git isdc_earthquake
git clone https://github.com/dodiws/isdc_landslide.git isdc_landslide
git clone https://github.com/dodiws/isdc_securityincident.git isdc_securityincident
git clone https://github.com/dodiws/isdc_naturaldisaster.git isdc_naturaldisaster
git clone https://github.com/dodiws/isdc_climate.git isdc_climate
git clone https://github.com/dodiws/isdc_weather.git isdc_weather
git clone https://github.com/dodiws/isdc_drought.git isdc_drought
```

> create a database with a name `geodb` and `securitydb`, then add new extension with a name `postgis` and `plpgsql` as a superuser.

### Create database

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

### Create Extension

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

from root project install new requiruments.txt `pip install -r requirements.txt`

### for OSX 

#### install package manual:
```
pip install scipy
pip install git+git://github.com/usgs/neicio.git
pip install git+git://github.com/usgs/neicmap.git
pip install git+git://github.com/usgs/libcomcat.git@1.0
```

#### if pygdal already installed:
```
pip install git+git://github.com/OpenGeoscience/dataqs.git 
pip install git+git://github.com/OpenGeoscience/dataqs.git --no-deps
```

### for Ubuntu

#### Binaries:
```
sudo apt-get install gdal-bin
sudo apt-get install libgdal-dev libgdal1h
sudo apt-get install libspatialindex-dev
```
#### Python Modules:
```
pip install pygdal==$(gdal-config --version)
pip install https://github.com/OpenGeoscience/dataqs/archive/master.zip --no-deps
pip install rtree
pip install rasterio
pip install GDAL==$(gdal-config --version) --global-option=build_ext --global-option="-I/usr/include/gdal"
pip install pip==10.0.1
pip install setuptools==39.0.1
pip install Celery==4.1.1
pip install django-celery==3.1.17
pip install git+git://github.com/usgs/neicio.git
pip install git+git://github.com/usgs/neicmap.git
pip install git+git://github.com/usgs/libcomcat.git@1.0
```
#### try different versions matplotlib==1.3.1 etc
```
pip install matplotlib==1.5.3
```
#### if pygdal already installed:
```
pip install git+git://github.com/OpenGeoscience/dataqs.git 
pip install git+git://github.com/OpenGeoscience/dataqs.git --no-deps
```

## Settings

### Local_Settings.py

`import geonode_formhub`<br/>
```
# Import uploaded shapefiles into a GeoGig repository
GEOGIG_DATASTORE = True
GEOGIG_DATASTORE_NAME = 'geogig-repo'
```

```
# Proxy paramaters for source : services.digitalglobe.com 
DGB_UNAME = '*******' 
DGB_UPASS = '*********' 
DGB_USOURCE = 'services.digitalglobe.com'
```


in `local_settings.py` add this code below in `DATABASES` array:

```
'geodb': {
        'ENGINE': 'django.contrib.gis.db.backends.postgis',
        # 'ENGINE': '', # Empty ENGINE name disables
        'NAME': 'geodb',
        'USER': 'postgres',
        'PASSWORD': 'password',
        'HOST': 'localhost',
        'PORT': '5432',
        'CONN_TOUT': 900,
    },
    'securitydb' : {
        'ENGINE': 'django.contrib.gis.db.backends.postgis',
        #'ENGINE': '', # Empty ENGINE name disables
        'NAME': 'security_data',
        'USER' : 'postgres',
        'PASSWORD' : 'password',
        # 'USER' : 'postgres', # db superuser account needed to install db extension on django-admin migrate
        # 'PASSWORD' : '12345',
        'HOST' : 'localhost',
        'PORT' : '5432',
        'CONN_TOUT': 900,
    }
```

for GeoExplorer Setting replace the iMMAP setting with code below :
```
# iMMAP SETTINGS
INSTALLED_APPS += ('isdc_panel', 'isdc_baseline')
IMMAP_LIST_PACKAGE = []
ISDC_PANEL_BUTTON = []

if 'isdc_panel' in INSTALLED_APPS:
    ISDC_PANEL_BUTTON += [
        {
            'component': 'Statistic',
            'icon': 'assignment', #material-icon,
            'tooltip': 'Statistics'
        },
        {
            'component': 'Findertool',
            'icon': 'find_in_page',
            'tooltip': 'Finder Tool'
        },
        {
            'component': 'Humanitarian',
            'icon': 'supervisor_account',
            'tooltip': 'Humanitarian Access'
        },
        {
            'component': 'Inspector',
            'icon': 'local_library',
            'tooltip': 'Settlement inspector'
        }
    ]
    if 'isdc_baseline' in INSTALLED_APPS:
        IMMAP_LIST_PACKAGE += [
            {
                'package' : 'isdc_baseline',
                'js' : 'addbaseline.js',
                'bundle': 'baseline.min.js',
                # 'api': SITEURL+'/static/isdc_baseline/js/baseline.json',
                'api': SITEURL+'/geoapi/statistic_baseline/',
                'domID': 'baseline'
            }
        ]
        
IMMAP_PACKAGE = [{'panel_setting': ISDC_PANEL_BUTTON},{'official_package': IMMAP_LIST_PACKAGE}]
```
Add installed optional modules to INSTALLED_APPS, DASHBOARD_PAGE_MODULES, QUICKOVERVIEW_MODULES, MAP_APPS_TO_DB_CUSTOM as necessary. 
See code comments for descriptions.

Example:
```
# ISDC Settings Start

# modules with stand-alone page in dashboard
DASHBOARD_PAGE_MODULES = [
    'flood',
    'avalanche',
    'accessibility',
    'earthquake',
    'landslide',
    'securityincident',
    'naturaldisaster',
    'weather',
    'drought',
]

# modules with components for geodb.geoapi.getRiskExecuteExternal() 
GETRISKEXECUTEEXTERNAL_MODULES = [
    'flood',
    'avalanche',
]

# modules with components for geodb.geo_calc.getQuickOverview() 
QUICKOVERVIEW_MODULES = [
    'flood',
    'avalanche',
    'accessibility',
    'earthquake',
    'landslide',
    'securityincident',
    # 'drought',
]

DATABASE_ROUTERS = [
    'geonode.dbrouter.defaultdbrouter',
]

DEFAULTDB = 'default'

# for every app in INSTALLED_APPS use DEFAULTDB database, then update with MAP_APPS_TO_DB_CUSTOM
MAP_APPS_TO_DB = {app.split('.')[-1]: DEFAULTDB for app in INSTALLED_APPS}

# add here for app using non-default database
MAP_APPS_TO_DB_CUSTOM = {
    'geodb': 'geodb',
    'flood': 'geodb',
    'avalanche': 'geodb',
    'earthquake': 'geodb',
    'securityincident': 'geodb',
    'securitydb': 'securitydb',
}
MAP_APPS_TO_DB.update(MAP_APPS_TO_DB_CUSTOM)

# default map code used for matrix resource usage tracking
MATRIX_DEFAULT_MAP_CODE = '5'

# ISDC Settings End
```

then migrate model of isdc module into database : 

`./manage.py makemigrations`<br/>
`./manage.py migrate`

if 'people_people' table already in database:

> fixing `... relation "people_profile" already exists` :
> `./manage.py showmigrations` to checking the people migrate version
> `./manage.py migrate people {migrate_version} --fake`
> `./manage.py makemigrations`
> `./manage.py migrate`