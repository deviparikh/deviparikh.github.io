---
layout: pub
urltitle: "Devi Parikh - Art"
title: "Devi Parikh - Art"
categories: Devi Parikh, Art
favicon: static/img/art/scretchbook.jpeg
permalink: /scretchbook
---

# Scretchbook

Some copied, some inspired, some original. Nothing has been filtered out.

<div class = 'art'>
  {% for person in site.data.art.scretchbook %}
  <div class = 'artpiece'>
    <a href = '{{ person.link }}'><img src = '{{person.link}}' alt = 'scretchbook'></a>
  </div>
  {% endfor %}
</div>