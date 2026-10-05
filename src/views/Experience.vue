<script setup lang="ts">
import { experience } from '../data/portfolio'
</script>
<template>
  <div class="experience-page">
    <section class="section page-intro experience-intro">
      <div class="experience-intro-copy">
        <p class="eyebrow">Experience · 2022 — 2026</p>
        <h1 class="display">A practice<br>in <span class="serif">progress.</span></h1>
      </div>
      <p class="experience-intro-note">Roles, teams, and lessons that continue to shape how I work.</p>
    </section>
    <section class="section experience-history">
      <div class="experience-history-heading">
        <p class="eyebrow">A little history</p>
        <h2>Where the work<br><span class="serif">has taken me.</span></h2>
      </div>
      <div class="experience-list">
        <article v-for="(item, index) in experience" :key="item.company" class="experience-entry">
          <span class="experience-entry-number">{{ String(index + 1).padStart(2, '0') }}</span>
          <div class="experience-entry-content">
            <div class="experience-entry-meta"><span class="experience-date">{{ item.date }}</span></div>
            <h3>{{ item.role }}</h3>
            <p class="experience-company">{{ item.company }}</p>
            <p class="experience-detail">{{ item.detail }}</p>
            <div class="tags"><span v-for="tag in item.tags" :key="tag" class="tag">{{ tag }}</span></div>
          </div>
        </article>
      </div>
    </section>
  </div>
</template>
