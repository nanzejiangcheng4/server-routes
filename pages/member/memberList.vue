<script setup lang="ts">
import type { Member } from "@/interfaces";

definePageMeta({
  layout: "member",
});

const asyncData = useLazyFetch("/member-management/members");
const responseData = asyncData.data;
const pending = asyncData.pending;
const memberList = computed((): Member[] => {
  // からの会員リスト配列を用意
  let returnList: Member[] = [];
  // レスポンスJSONデータがnullでなければ
  if (responseData.value != null) {
    returnList = responseData.value.data;
  }
  return returnList;
});
const isEmptyList = computed((): boolean => {
  return memberList.value.length == 0;
});
</script>

<template>
  <nav id="breadcrumbs">
    <ul>
      <li><NuxtLink v-bind:to="{ name: 'index' }">TOP</NuxtLink></li>
      <li>会員リスト</li>
    </ul>
  </nav>
  <section>
    <h2>会員リスト</h2>
    <p>
      新規登録は<NuxtLink v-bind:to="{ name: 'member-memberAdd' }"
        >こちら</NuxtLink
      >から
    </p>
    <p v-if="pending">データ取得中・・・・</p>
    <section v-else>
      <ul>
        <li v-if="isEmptyList">会員情報は存在しません。</li>
        <li v-for="member in memberList" v-bind:key="member.id">
          <NuxtLink
            v-bind:to="{
              name: 'member-memberDetail-id',
              params: { id: member.id },
            }"
          >
            IDが{{ member.id }}の{{ member.name }}さん
          </NuxtLink>
        </li>
      </ul>
    </section>
  </section>
</template>
