<template>
  <div class="row justify-content-center my-5">
    <div class="col-sm-6">
      <div class="card mb-3">
        <div class="card-body">
          <UploadForm />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UploadForm from "../components/UploadForm";
export default {
  name: "Home",
  props: {
    showAddTask: Boolean,
  },
  components: {
    UploadForm,
  },
};
</script>
