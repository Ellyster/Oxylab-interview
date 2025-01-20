terraform {
  required_providers {
    google = {
      source = "hashicorp/google"
      version = "6.16.0"
    }
  }

  backend "gcs" {
    bucket  = "oxylabs-datasets-interviews"
    prefix  = "alonso/terraform/state"
  }
}