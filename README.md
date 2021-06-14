# iReporter Api

[![Build Status](https://travis-ci.com/kalsmic/iReporterApi.svg?branch=api)](https://travis-ci.com/kalsmic/iReporterApi)
[![Maintainability](https://api.codeclimate.com/v1/badges/2b2df2ba4fc8d8138ab4/maintainability)](https://codeclimate.com/github/kalsmic/iReporterApi/maintainability)
[![Coverage Status](https://coveralls.io/repos/github/kalsmic/iReporterApi/badge.svg?branch=api)](https://coveralls.io/github/kalsmic/iReporterApi?branch=api-database)

Corruption is a huge bane to Africa’s development. African countries must develop novel and
localised solutions that will curb this menace, hence the birth of iReporter. iReporter enables
any/every citizen to bring any form of corruption to the notice of appropriate authorities and the general public. Users can also report on things that needs government intervention.

## Complete Tasks

### User stories on Pivotal tracker

:link:  [Link to user stories](https://www.pivotaltracker.com/n/projects/2231809)

### UI Templates

:link: [Live project on gh-pages](https://kalsmic.github.io/iReporterApi/UI/index.html)

:link: [Link to Source code](https://github.com/kalsmic/iReporterApi/tree/api-db-with-ui)

### API V1 - python data structures

:rocket: [Link to Deployment on Heroku API V1](https://ireporterapiv1.herokuapp.com/)

:green_book: [Link to API V1 documentation](https://app.swaggerhub.com/apis-docs/kalsmiciReporter1/iReporter/v1)

:link: [Link API V1 source code](https://github.com/kalsmic/iReporterApi/tree/api)

### API V2 - PostgreSQL database

:rocket: [Link to Deployment on Heroku API V2](https://ireporterapiv2.herokuapp.com/)

:green_book: [Link to API V2 documentation](https://ireporterapiv2.herokuapp.com/api/v2/docs)

:link: [Link API V2 Source code](https://github.com/kalsmic/iReporterApi/tree/api-database)

## How to set up the project

Open the terminal and run the following commands

```bash
    git clone https://github.com/kalsmic/iReporterApi.git
    cd iReporterApi
    git checkout api-database
    python3 -m venv venv
    source venv/bin.activate
    pip3 install -r requirements.txt
    source venv/bin/activate
    export APP_SETTINGS="instance.config.ProductionConfig"
    export SECRET_KEY="your secret key"
    python deploy.py
```

## How to run tests

Enter the command below in the terminal to run the tests with coverage using
 pytest

```bash
  pytest --cov
```

## Built With

-   [Python](https://www.python.org/) - A programming language that lets you work quickly and integrate systems more effectively
-   [Flask](http://flask.pocoo.org/) - A microframework for Python based on Werkzeug, Jinja 2 and good intentions.

## Author

Kalule Arthur

## Acknowledgements

Big thanks to LFA's and fellow colleagues at [Andela](https://andela.com) for reviewing the project and the guiding on the basic principles.
