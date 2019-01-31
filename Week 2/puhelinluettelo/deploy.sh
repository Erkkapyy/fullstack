#!/bin/sh
npm run build
rm -rf ../../../fullstackW3/build
cp -r build ../../../fullstackW3