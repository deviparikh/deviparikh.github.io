---
layout: pub
urltitle: "Devi Parikh - Algorithmic Art"
title: "Devi Parikh - Algorithmic Art"
categories: Devi Parikh, Algorithmic Art
favicon: static/img/art/yin_yang.png
permalink: /yin_yang
---

# Yin And Yang

<div class = 'art'>
  <!-- loop through persons -->
  {% for person in site.data.art.yin_yang %}
  <div class = 'artpiece'>
    <a href = '{{ person.link }}'><img src = '{{person.link}}' alt = 'yin and yang'></a>
  </div>
  {% endfor %}
</div>