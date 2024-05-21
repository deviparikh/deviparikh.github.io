---
layout: pub
urltitle: "Devi Parikh - Algorithmic Art"
title: "Devi Parikh - Algorithmic Art"
categories: Devi Parikh, Algorithmic Art
favicon: static/img/art/rangoli.png
permalink: /rangoli
---

# Rangoli

<div class = 'art'>
  {% for person in site.data.art.rangoli %}
  <div class = 'artpiece'>
    <a href = '{{ person.link }}'><img src = '{{person.link}}' alt = 'rangoli'></a>
  </div>
  {% endfor %}
</div>