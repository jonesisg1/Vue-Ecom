<template>
  <section class="about-us">
    <div class="row p-4">
      <!-- TODO there should an h1 title here -->
      <div class="col-6">
        <img class="float-lg-right" :src="useAsset('home/tom-austin-XbZy0-JHINA-unsplash.jpg')" alt="home-img" title="home-img" loading="lazy">
      </div>
      <div class="col-12 col-sm-6">
        <h2>Supa dupa Bike Shop Site!</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed efficitur consequat libero. Duis nibh est, auctor in tincidunt non, iaculis sit amet libero. Fusce vitae varius turpis. Integer consectetur sapien a elit condimentum condimentum. Etiam vel libero libero. Ut pharetra convallis nibh, eu accumsan erat pellentesque ut. Cras scelerisque est quis dui suscipit posuere. Donec facilisis odio urna, quis molestie sapien gravida et. Phasellus sit amet varius turpis. Nam diam arcu, finibus blandit tempus eu, fringilla eu tortor. Cras vel euismod nisl, vitae placerat lacus. Morbi iaculis, lacus in convallis fringilla, mauris lectus laoreet lacus, egestas consequat diam eros ut nisl.
        </p>
      </div>
    </div>
    <div class="row p-4">
      <div
        class="col-12 col-sm-6 text-sm-right text-md-right ml-sm-0 ml-md-5 ml-lg-5 ml-xl-5 text-lg-right order-sm-first order-12"
        style="margin-right: -8%; z-index:1;">
        <h2>Workshop Facilities</h2>
        <p>Nulla porta facilisis scelerisque. Nam nec mattis dolor, in placerat lectus. Donec lobortis fringilla neque nec feugiat. Aenean ac erat neque. Vivamus vestibulum nec risus nec fringilla. Nulla facilisi. Sed sed ante a sapien elementum vulputate. Nulla dictum velit sit amet mi eleifend fringilla. Nam vestibulum ipsum sit amet sapien pretium, et pharetra dui venenatis. Donec sed eleifend sapien.
        </p>
      </div>
      <div class="col-6">
        <img :src="useAsset('home/taylor-smith-GNSIOmiBFaY-unsplash.jpg')" alt="home-img-2" title="home-img-2" loading="lazy">
      </div>
    </div>
  </section>
</template>

<style scoped>
.about-us img {
  width: 90%;
  min-width: 380px;
}
</style>
