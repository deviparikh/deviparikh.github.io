---
layout: pub
urltitle: "Devi Parikh - Algorithmic Art"
title: "Devi Parikh - Algorithmic Art"
categories: Devi Parikh, Algorithmic Art
favicon: static/img/art/spractal.png
permalink: /spractal
---

# Spractal

<h2><a href='./create_your_own/spractal.html'>Create Your Own!</a></h2>

<div class = 'art'>
  {% for person in site.data.art.spractal %}
  <div class = 'artpiece'>
    <a href = '{{ person.link }}'><img src = '{{person.link}}' alt = 'spractal'></a>
  </div>
  {% endfor %}
</div>