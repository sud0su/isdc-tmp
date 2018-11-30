# Getting Started
## Prerequisite Before Installing iSDC
Make sure that you already have installed **PostgreSQL v10.5** and **python 2.7** on your local machine<br>
Please refer to the links below for the installing guidelines.
>- [PostgreSQL v10.5][1]
>- [Python 2.7][2]

[1]: <https://www.postgresql.org/download/> "PostgreSQL v10.5 Installation Guide"
[2]: <https://medium.com/@yangnana11/installing-python-2-on-mac-os-x-d0f1c9c4d808> "Python 2.7 Installation Guide"

## Recommendation for Developer
We used DBngin to make our development easier. We recommend other developer to also used it for development.<br>
DBngin is a management tool for databases, this tool can manage multiple database servers with multiple versions and ports.
You can download it from [here][3].

[3]: <https://dbngin.com/release/osx/dbngin_latest> "Downloads DBngin"

## iSDC Installation on OSX

### Preparing Setup

Create vitualenv and activate
```
    virtualenv ISDC
    cd ISDC && source bin/activate
```

Clone the existing iSDC from github
```
    git clone https://github.com/sud0su/isdc-tmp.git && cd isdc-tmp
```

Install dependencies
```
    pip install lxml pyproj nose httplib2 shapely pillow paver
```

Install requirements
```
    pip install -r requirements.txt
```

### Create Database

Create iSDC database on postgres with command line below<br>
```
    psql -U postgres -c 'create database isdc;'
    psql -U postgres -c 'create database isdc_data;'
    psql -U postgres -d isdc_data -c 'CREATE EXTENSION postgis;'
    psql -U postgres -d isdc_data -c 'GRANT ALL ON geometry_columns TO PUBLIC;'
    psql -U postgres -d isdc_data -c 'GRANT ALL ON spatial_ref_sys TO PUBLIC;'
    psql -U postgres -d isdc_data -c 'GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO postgres;'
```

### Install GeoNode
Install GeoNode Dependency
```
    pip install -e .
```

Cleanup old stuff with hard reset
```
    paver reset_hard
    rm -Rf geoserver
    rm -Rf downloaded/*.*
```

Edit local_settings.py
>- Copy `local_settings.py.geoserver.sample` file from `geonode` folder
>- Rename the file to `local_settings.py` and edit accordingly to your server configuration (modify the user and password)<br>
```
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.postgresql_psycopg2',
            'NAME': 'isdc',
            'USER': 'postgres',
            'PASSWORD': 'password',
            'HOST': 'localhost',
            'PORT': '5432',
            'CONN_TOUT': 900,
        },
        # vector datastore for uploads
        'datastore': {
            'ENGINE': 'django.contrib.gis.db.backends.postgis',
            'NAME': 'isdc_data',
            'USER': 'postgres',
            'PASSWORD': 'password',
            'HOST': 'localhost',
            'PORT': '5432',
            'CONN_TOUT': 900,
        }
    }
```

Install GDAL
```
    pip install GDAL==$(gdal-config --version | awk -F'[.]' '{print $1"."$2}')
```

Setup GeoNode
```
    paver setup
    paver sync
```

If you got an error with message `raise GEOSException('Could not parse version info string "%s"' % ver)`<br>
Please do the following:
>- Edit file `libgeos.py` in `lib/python2.7/site-packages/django/contrib/gis/geos/libgeos.py`
>- Look for the function `geos_version_info` at `line 144` 
>- Change code `geos_version().decode()` with `geos_version().decode().split(' ')[0]`

After fixing the error code above, redo `paver sync`<br>
When the sync has completed, please **make sure that isdc database has already created tables** in it.<br><br>
Starts the GeoNode development web server and GeoServer

```
    paver start
```


### Install iSDC Base Package
Install iSDC Package<br>
Base package for iSDC must be installed before another package, see the following code to install base package<br>
```
    pip install isdc-dashboard isdc-geodb  isdc-matrix isdc-avatar
```

After installing the base package, you have to add the code below on the bottom line of your `local_settings.py` 
```
    # ==================
    # add by dodi start

    # ISDC external requirements
    ISDC_EXTERNAL_REQUIREMENTS = (
        'mathfilters',
        'graphos',
    )

    # ISDC required apps
    ISDC_BASE_APPS = (
        'matrix',
        'geodb',
        'dashboard',
    )

    # ISDC additional apps
    ISDC_ADDITIONAL_APPS = (
        
    )

    # modules with stand-alone page in dashboard
    # these modules must have get_dashboard_meta() function
    DASHBOARD_PAGE_MODULES = (
        
    )

    INSTALLED_APPS += ISDC_EXTERNAL_REQUIREMENTS + ISDC_BASE_APPS + ISDC_ADDITIONAL_APPS + DASHBOARD_PAGE_MODULES

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
        'drought',
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
        'drought': 'geodb',
        'securitydb': 'securitydb',
    }
    MAP_APPS_TO_DB.update(MAP_APPS_TO_DB_CUSTOM)

    # default map code used for matrix resource usage tracking
    MATRIX_DEFAULT_MAP_CODE = '5'

    # add by dodi end
    # ==================
```

After adding the code above, you must create database `geodb` and `security_data`
```
    psql -U postgres -c 'create database geodb;'
    psql -U postgres -c 'create database security_data;'
```

After that, you must add new extension as a superuser with name `postgis` and `plpgsql` to each of the database.
```
    psql -U postgres -d geodb -c 'CREATE EXTENSION postgis;'
    psql -U postgres -d geodb -c 'CREATE EXTENSION plpgsql;'
    psql -U postgres -d security_data -c 'CREATE EXTENSION postgis;'
    psql -U postgres -d security_data -c 'CREATE EXTENSION plpgsql;'
```

Add code below into the `DATABASES` array at the **bottom of line** (don’t forget to modify the user and password accordingly):
```
    'geodb': {
        'ENGINE': 'django.contrib.gis.db.backends.postgis',
        'NAME': 'geodb',
        'USER': 'postgres',
        'PASSWORD': 'password',
        'HOST': 'localhost',
        'PORT': '5432',
        'CONN_TOUT': 900,
    },
    'securitydb' : {
        'ENGINE': 'django.contrib.gis.db.backends.postgis',
        'NAME': 'security_data',
        'USER' : 'postgres',
        'PASSWORD' : 'password',
        'HOST' : 'localhost',
        'PORT' : '5432',
        'CONN_TOUT': 900,
    }
```

Before you migrate a new database from base package you must delete the existing migration file from isdc root project and reset django migration with this command line
```
    find . -path "*/migrations/*.py" -not -name "__init__.py" -delete
    find . -path "*/migrations/*.pyc"  -delete

    ./manage.py reset_migrations  account actstream admin agon_ratings announcements auth avatar base contenttypes dialogos documents geodb groups guardian invitations layers maps matrix monitoring oauth2_provider people pinax_notifications qgis_server services sessions sites socialaccount taggit tastypie upload user_messages
```

Then migrate new database from the base package
```
    ./manage.py makemigrations	
    ./manage.py migrate geodb --database geodb
```

Create new Django superuser (You can skip this step if you already have superuser account)
```
    python manage.py createsuperuser
```

### Setting GeoExplorer
Activate geonode-client on iSDC<br>
>- Open your `local_settings.py` 
>- Find `GEONODE_CLIENT_HOOKSET = "geonode.client.hooksets.GeoExtHookSet"` and **comment that code**
>- Please **uncomment** the following code 
```
    INSTALLED_APPS += ('geonode-client', )
    GEONODE_CLIENT_LAYER_PREVIEW_LIBRARY = 'react'  # DEPRECATED use HOOKSET instead
    GEONODE_CLIENT_HOOKSET = "geonode.client.hooksets.ReactHookSet"
```

Install iSDC GeoExplorer Package
```
    pip install isdc-geonode-client isdc-geopanel
```

Add iSDC GeoExplorer Settings code below into your `local_settings.py`
```
    # ======================
    # added by razinal start

    PANEL_GEOISDC = (
        'isdc_geopanel',
    )

    GEOEXPLORER_ISDC = (
    )

    INSTALLED_APPS += PANEL_GEOISDC + GEOEXPLORER_ISDC
    IMMAP_LIST_PACKAGE = []
    GEOPANEL_ISDC = []

    if 'isdc_geopanel' in INSTALLED_APPS:
        GEOPANEL_ISDC += [
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
        if 'isdc_geobaseline' in INSTALLED_APPS:
            IMMAP_LIST_PACKAGE += [
                {
                    'package' : 'isdc_geobaseline',
                    'js' : 'addbaseline.js',
                    'bundle': 'baseline.min.js',
                    'api': SITEURL+'/geoapi/statistic_baseline/',
                    'domID': 'baseline'
                }
            ]
        
            
    IMMAP_PACKAGE = [{'panel_setting': GEOPANEL_ISDC},{'official_package': IMMAP_LIST_PACKAGE}]
    
    # added by razinal end
    # ====================
```

You have successfully installed the base function in iSDC on your local machine. Please go to your localhost to check if it has been properly installed.

### Install Optional Module