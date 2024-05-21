---
layout: pub
urltitle: "Devi Parikh - Algorithmic Art"
title: "Devi Parikh - Algorithmic Art"
categories: Devi Parikh, Algorithmic Art
favicon: static/img/art/white_circles.png
permalink: /all_circles
---

# Circles

<div class = 'people'>
  <!-- loop through persons -->
  {% for person in site.data.art.all_circles %}
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