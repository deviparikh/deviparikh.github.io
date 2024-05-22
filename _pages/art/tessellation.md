---
layout: pub
urltitle: "Devi Parikh - Algorithmic Art"
title: "Devi Parikh - Algorithmic Art"
categories: Devi Parikh, Algorithmic Art
favicon: /static/img/art/tessellation.png
permalink: /tessellation
---

<!--
	The pieces shown here were made using leaves_old.html. To replicate, set the parameters from these image filenames in leaves_old.html
-->


# Tessellation

<h2><a href='./create_your_own/tessellation.html'>Create Your Own!</a></h2>

<div class = 'art'>
  {% for person in site.data.art.tessellation %}
  <div class = 'artpiece'>
    <a href = '{{ person.link }}'><img src = '{{person.link}}' alt = 'tessellation'></a>
  </div>
  {% endfor %}
</div>