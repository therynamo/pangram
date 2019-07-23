#!/bin/bash

gcloud beta functions deploy pangram --trigger-http --runtime nodejs10 --memory 1024MB