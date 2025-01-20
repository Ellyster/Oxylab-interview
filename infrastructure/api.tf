resource "google_cloud_run_v2_service" "api" {
  name     = "oxylab-alonso-interview-api"
  project = var.project
  location = var.region
  deletion_protection = false
  ingress = "INGRESS_TRAFFIC_ALL"

  template {
    containers {
      image = var.docker_image
    }
  }
}

resource "google_cloud_run_service_iam_binding" "api" {
  project = var.project
  location = google_cloud_run_v2_service.api.location
  service  = google_cloud_run_v2_service.api.name
  role     = "roles/run.invoker"
  members = [
    "allUsers"
  ]
}