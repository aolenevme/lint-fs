#!/usr/bin/env sh 

rm -rf release
mkdir release

platforms=("win" "linux" "macos")

for platform in "${platforms[@]}"
do
    mkdir -p bin/$platform
    cd bin/$platform

    npx pkg ../../src/index.js --targets $platform

    if [ $platform = "win" ]; then
        mv index.exe "$platform.exe"
    else
        mv index $platform
    fi

    cd ../../

    tar -C bin -czvf release/$platform.tar.gz $platform/

    if [ $? -ne 0 ]; then
        echo 'An error has occurred! Aborting the script execution...'
        exit 1
    fi
done

rm -rf bin
