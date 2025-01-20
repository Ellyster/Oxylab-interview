LOCAL_IMAGE := oxylab-alonso-interview:v1
REMOTE_IMAGE := europe-west1-docker.pkg.dev/oxyds-playground/oxylabs-datasets-interviews/oxylab-alonso-interview:v1

all:: build push deploy

build:
	docker buildx build -t $(LOCAL_IMAGE) . --provenance=false --platform linux/amd64,linux/arm64

push:
	docker image tag $(LOCAL_IMAGE) $(REMOTE_IMAGE)
	docker push $(REMOTE_IMAGE) --platform linux/amd64

deploy:
	terraform -chdir=infrastructure init
	terraform -chdir=infrastructure apply -var-file=variables/playground.tfvars -var="docker_image=${REMOTE_IMAGE}"