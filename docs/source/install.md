# Getting Started

## Installation
The following is a quick guide to get iSDC up and running in most common operating systems. This is meant to be run on a fresh machine with no previously installed packages.

### OS X
```
    virtualenv isdc
    cd isdc && source bin/activate
    git clone https://github.com/sud0su/isdc-tmp.git
    pip install -r requirements.txt
    pip install -e .
    paver reset_hard
    rm -Rf geoserver 
    rm -Rf downloaded/*.*
```

rename `local_settings.py.geoserver.sample` to `local_settings.py`

edit database name, user, and password
Install GDAL and setup ISDC

```  
    pip install GDAL==$(gdal-config --version | awk -F'[.]' '{print $1"."$2}')
    paver setup
    paver sync
```

Fixing error `raise GEOSException('Could not parse version info string "%s"' % ver)`
>- Edit file located at `site-packages/django/contrib/gis/geos/libgeos.py` 
>- Look for the function `geos_version_info`
>- Change `ver = geos_version().decode()` with `ver = geos_version().split(' ')[0]`
  
Fixing error `ImportError: cannot import name GeoIP`
``` 
    brew install geoip
``` 

You can now start ISDC
``` 
    paver start
    paver stop
``` 
Java JDK needs to be installed for Geoserver to work, download from [here](https://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html).

## Integration
The following is a quick guide to integrate all packages that exist in iSDC

**INSTAL GEO-EXPLORER PACKAGE FROM GITHUB**

__install django-geonode-client__
```
pip install git+git://github.com/sud0su/isdc-geonode-client.git
```
__install isdc-geobaseline__
```
pip install git+git://github.com/sud0su/isdc-geobaseline.git@master#egg=isdc-geobaseline
```
__install isdc-geoaccessibility__
```
pip install git+git://github.com/sud0su/isdc-geoaccessibility.git@master#egg=isdc-geoaccessibility
```

### OS X
Add code below at the bottom of file `activate` that located at `{environment}\bin` 

**DEVELOPMENT PACKAGE FOR LOCAL MACHINE**
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
### Ubuntu
To make import module works, add module directory to `PYTHONPATH` 

In terminal, open virtual environment activate script using nano:
```
    nano ~/isdc/bin/activate
```
Add code below at the bottom of file `activate` that located at `~/isdc/bin/activate` 

**DEVELOPMENT PACKAGE FOR LOCAL MACHINE**
```
    export PYTHONPATH=${PYTHONPATH}:\
    ${HOME}/isdc/lib/isdc-modules/:\
    ${HOME}/isdc/lib/isdc-modules/isdc_geodb/:\
    ${HOME}/isdc/lib/isdc-modules/isdc_dashboard/:\
    ${HOME}/isdc/lib/isdc-modules/isdc_matrix/:\
    ${HOME}/isdc/lib/isdc-modules/isdc_pushnotif/:\
    ${HOME}/isdc/lib/isdc-modules/isdc_securitydb/:\
    ${HOME}/isdc/lib/isdc-modules/isdc_userstatistics/:\
    ${HOME}/isdc/lib/isdc-modules/isdc_uploadpdf/:\
    ${HOME}/isdc/lib/isdc-modules/isdc_flood/:\
    ${HOME}/isdc/lib/isdc-modules/isdc_avalanche/:\
    ${HOME}/isdc/lib/isdc-modules/isdc_accessibility/:\
    ${HOME}/isdc/lib/isdc-modules/isdc_earthquake/:\
    ${HOME}/isdc/lib/isdc-modules/isdc_landslide/:\
    ${HOME}/isdc/lib/isdc-modules/isdc_securityincident/:\
    ${HOME}/isdc/lib/isdc-modules/isdc_naturaldisaster/:\
    ${HOME}/isdc/lib/isdc-modules/isdc_climate/:\
    ${HOME}/isdc/lib/isdc-modules/isdc_weather/:\
    ${HOME}/isdc/lib/isdc-modules/isdc_drought/:\
```
Restart virtual environment:
```
    deactivate;source ../bin/activate
```

Create folder `isdc-modules` in `${HOME}/isdc/lib` folder 

Clone ISDC module from `https://github.com/dodiws/` to `${HOME}/lib/isdc-modules/` folder accordingly (see example below)

Base modules:
```
    cd ${HOME}/lib/isdc-modules/

    git clone https://github.com/dodiws/isdc_dashboard.git isdc_dashboard
    git clone https://github.com/dodiws/isdc_geodb.git isdc_geodb
    git clone https://github.com/dodiws/isdc_dashboard.git isdc_dashboard
    git clone https://github.com/dodiws/isdc_matrix.git isdc_matrix
    git clone https://github.com/dodiws/account.git account
    git clone https://github.com/dodiws/avatar.git avatar
    git clone https://github.com/dodiws/geonode_formhub.git geonode_formhub
```
Optional modules:
```
    cd ${VIRTUAL_ENV}/lib/isdc-modules/
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

### Create database
Create a database with name `geodb` and `securitydb`

Use SQL query below to make `geodb` database

```
CREATE DATABASE geodb
  WITH OWNER = postgres
       ENCODING = 'UTF8'
       TABLESPACE = pg_default
       LC_COLLATE = 'C'
       LC_CTYPE = 'C'
       CONNECTION LIMIT = -1;
```

and query below for `securitydb` database

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
Create extension for the new db (`geodb` and `securitydb`)

Add new extension with name `postgis` and `plpgsql` as a superuser to each of the database.

`plpgsql`

```
 CREATE EXTENSION plpgsql
  SCHEMA pg_catalog
  VERSION "1.0";
```

`postgis`
```
 CREATE EXTENSION postgis
  SCHEMA public
  VERSION "2.1.8";
```

from root project install the new `requiruments.txt`
```
    pip install -r requirements.txt
```

## Other Setup
### OSX 

Install Manual Package
```
    pip install scipy
    pip install git+git://github.com/usgs/neicio.git
    pip install git+git://github.com/usgs/neicmap.git
    pip install git+git://github.com/usgs/libcomcat.git@1.0
```

If `pygdal` already installed
```
    pip install git+git://github.com/OpenGeoscience/dataqs.git 
    pip install git+git://github.com/OpenGeoscience/dataqs.git --no-deps
```

### Ubuntu

Install Binaries
```
    sudo apt-get install gdal-bin
    sudo apt-get install libgdal-dev libgdal1h
    sudo apt-get install libspatialindex-dev
```
Install Python Modules
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
Fixing error `try different versions matplotlib==1.3.1 etc`
```
    pip install matplotlib==1.5.3
```
If `pygdal` already installed:
```
    pip install git+git://github.com/OpenGeoscience/dataqs.git 
    pip install git+git://github.com/OpenGeoscience/dataqs.git --no-deps
```

## Settings

### local_settings.py

Add code below to import module used in ISDC
```
import geonode_formhub
```
Change/Add the code below into the corresponded codes respectively
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


Add code below into the `DATABASES` array at the bottom of line

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
Migrate the model of ISDC module into database

```
    ./manage.py makemigrations
    ./manage.py migrate
```

If 'people_people' table already in database

Fixing error `... relation "people_profile" already exists`

>- Check the people migrate version
```
    ./manage.py showmigrations
```
>- Fixing the broken database
```
    ./manage.py migrate people {migrate_version} --fake
    ./manage.py makemigrations`
    ./manage.py migrate
```

For GeoExplorer Setting replace the `iMMAP SETTINGS` with code below
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

### settings.py

To install the optional module, add the desired module to each of `INSTALLED_APPS`, `DASHBOARD_PAGE_MODULES`, `QUICKOVERVIEW_MODULES`, `MAP_APPS_TO_DB_CUSTOM` as necessary. See the comments of the example code below for descriptions.
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