---
layout: pub
urltitle: "Devi Parikh - Art"
title: "Devi Parikh - Art"
categories: Devi Parikh, Art
favicon: static/img/art/fiber.jpeg
permalink: /fiber
---

# Fiber

<div class = 'art'>
  {% for person in site.data.art.fiber %}
  <div class = 'artpiece'>
    <a href = '{{ person.link }}'><img src = '{{person.link}}' alt = 'fiber'></a>
  </div>
  {% endfor %}
</div>