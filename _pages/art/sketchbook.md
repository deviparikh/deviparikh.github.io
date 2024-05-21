---
layout: pub
urltitle: "Devi Parikh - Art"
title: "Devi Parikh - Art"
categories: Devi Parikh, Art
favicon: static/img/art/sketchbook.jpeg
permalink: /sketchbook
---

# Sketchbook

Some copied, some inspired, some original. Nothing has been filtered out.

<div class = 'art'>
  {% for person in site.data.art.sketchbook %}
  <div class = 'artpiece'>
    <a href = '{{ person.link }}'><img src = '{{person.link}}' alt = 'sketchbook'></a>
  </div>
  {% endfor %}
</div>