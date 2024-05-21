---
layout: pub
urltitle: "Devi Parikh - Algorithmic Art"
title: "Devi Parikh - Algorithmic Art"
categories: Devi Parikh, Algorithmic Art
favicon: static/img/art/strokes.png
permalink: /strokes
---

# Strokes

<h2><a href='./create_your_own/strokes.html'>Create Your Own!</a></h2>

<div class = 'art'>
  {% for person in site.data.art.strokes %}
  <div class = 'artpiece'>
    <a href = '{{ person.link }}'><img src = '{{person.link}}' alt = 'strokes'></a>
  </div>
  {% endfor %}
</div>