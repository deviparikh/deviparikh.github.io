---
layout: pub
urltitle: "Devi Parikh - Algorithmic Art"
title: "Devi Parikh - Algorithmic Art"
categories: Devi Parikh, Algorithmic Art
favicon: static/img/art/neurangoli.png
permalink: /neurangoli
---

# Neurangoli

<div class = 'art'>
  {% for person in site.data.art.neurangoli %}
  <div class = 'artpiece'>
    <a href = '{{ person.link }}'><img src = '{{person.link}}' alt = 'neurangoli'></a>
  </div>
  {% endfor %}
</div>