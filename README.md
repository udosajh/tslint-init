# tslint-init
tslint-init

- run below command in terminal
    - npx tslint-init
    - this will create tslint.json file and add lint command in package.json
    - it also changes package json file indentation to 4 spaces
    - npx is available in npm version >= 5.2.0
        - npm below 5.2.0 can install npx using below command
            - npm i npx
    - npx tslint-init -n help
    - npx tslint-init -n -l -i 2 -t tsconfig.src.json
    - -n => pass args to script (npx flag)
    - -l => adds lint command in terminal tslint -c tslint.json -p <tsconfigFileName> (default => true)
    - -t => tsconfig file name (default => tsconfig.json)
    - i => indentation spaces (default => 4)
    - --help => to get info about flags (-l, -t, -i)