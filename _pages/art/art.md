---
layout: pub
urltitle: "Devi Parikh - Art"
title: "Devi Parikh - Art"
categories: Devi Parikh, Art
favicon: static/img/art/art.png
permalink: /art
---

<!--<br>
<a href="https://twitter.com/deviparikh?ref_src=twsrc%5Etfw" class="twitter-follow-button" data-show-screen-name="false" data-show-count="false">Follow @deviparikh</a><script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>-->

# Analog Art

<div class = 'people'>
  <!-- loop through persons -->
  {% for person in site.data.art.analogart %}
  <div class = 'artthumb'>
    <a href = '{{ person.link }}'><img src = 'static/img/art/{{ person.thumb }}' alt = 'thumb'></a>
    <p>
      <a href = '{{ person.link }}'>{{person.name}}</a>
      <br>
      {{person.title}}
    </p>
  </div>
  {% endfor %}
</div>

# Generative Art

<div class = 'people'>
  <!-- loop through persons -->
  {% for person in site.data.art.generativeart %}
  <div class = 'artthumb'>
    <a href = '{{ person.link }}'><img src = 'static/img/art/{{ person.thumb }}' alt = 'thumb'></a>
    <p>
      <a href = '{{ person.link }}'>{{person.name}}</a>
      <br>
      {{person.title}}
    </p>
  </div>
  {% endfor %}
</div>

# Digital Art

<div class = 'people'>
  <!-- loop through persons -->
  {% for person in site.data.art.digitalart %}
  <div class = 'artthumb'>
    <a href = '{{ person.link }}'><img src = 'static/img/art/{{ person.thumb }}' alt = 'thumb'></a>
    <p>
      <a href = '{{ person.link }}'>{{person.name}}</a>
      <br>
      {{person.title}}
    </p>
  </div>
  {% endfor %}
</div>

<h1>Create Your Own</h1>

(Not to be used for commercial purposes without prior consent.)

<div class = 'people'>
  <!-- loop through persons -->
  {% for person in site.data.art.create_your_own %}
  <div class = 'artthumb'>
    <a href = '{{ person.link }}'><img src = 'static/img/art/{{ person.thumb }}' alt = 'thumb'></a>
    <p>
      <a href = '{{ person.link }}'>{{person.name}}</a>
      <br>
      {{person.title}}
    </p>
  </div>
  {% endfor %}
</div>



<!-- <div class = 'art'>
  {% for person in site.data.art.art %}
  <div class = 'artpiece'>
    <a href = '{{ person.link }}'><img src = 'static/img/art/{{ person.thumb }}' alt = 'thumb'></a>
    <p>
      <a href = '{{ person.link }}'>{{person.name}}</a>
    </p>
  </div>
  {% endfor %}
</div> -->