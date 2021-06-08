#!/usr/bin/env sh 

rm -rf release

package=$1
if [[ -z "$package" ]]; then
  echo "usage: $0 <package-name>"
  exit 1
fi

platforms=("windows/amd64" "windows/386" "linux/amd64" "linux/386" "darwin/amd64")

for platform in "${platforms[@]}"
do
    platform_split=(${platform//\// })
    GOOS=${platform_split[0]}
    GOARCH=${platform_split[1]}

    directory_name=$GOOS'-'$GOARCH
    output_name='lint-fs'

    if [ $GOOS = "windows" ]; then
        output_name+='.exe'
    fi

    mkdir -p bin/$directory_name
    env GOOS=$GOOS GOARCH=$GOARCH go build -o bin/$directory_name/$output_name $package

    mkdir release
    tar -C bin -czvf release/$directory_name.tar.gz $directory_name/

    if [ $? -ne 0 ]; then
        echo 'An error has occurred! Aborting the script execution...'
        exit 1
    fi
done

rm -rf bin
