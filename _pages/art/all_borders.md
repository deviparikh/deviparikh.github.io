---
layout: pub
urltitle: "Devi Parikh - Algorithmic Art"
title: "Devi Parikh - Algorithmic Art"
categories: Devi Parikh, Algorithmic Art
favicon: static/img/art/borders_filled.png
permalink: /all_borders
---

# Borders

<div class = 'people'>
  <!-- loop through persons -->
  {% for person in site.data.art.all_borders %}
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


Tutorial
<iframe width="200" height="200" src="https://www.youtube.com/embed/_exTH7fB4ko" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>


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