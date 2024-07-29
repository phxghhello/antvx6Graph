<template>
  <div class="collapse-container">
    <div
      class="collapse-item"
      :class="[isActive(item) ? 'is-active' : '']"
      v-for="(item, index) in collaseItems"
      :key="index"
    >
      <div
        class="button collapse-item__header"
        :aria-expanded="isActive(item)"
        @click="handleHeaderClick(item)"
      >
        <el-icon class="arrow-icon">
          <arrow-right />
        </el-icon>
        <slot name="title" :index="index" :item="item">{{ item.title }}</slot>
      </div>
      <transition>
        <div
          class="section-container"
          v-show="isActive(item)"
          :aria-hidden="!isActive(item)"
        >
          <div class="section-content">
            <slot :index="index" :item="item"></slot>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { useCollapse } from "./hooks/use-collapse";
import { useCollapseItem } from "./hooks/use-collapse-item";
import { ArrowRight } from "@element-plus/icons-vue";

// defineOptions({
//   name: "Collapse",
// });

const props = defineProps({
  accordion: Boolean,
  modelValue: {
    type: [Array, String, Number],
    default: () => [],
  },
  collaseItems: {
    type: Array,
    default: () => [],
  },
});
const emit = defineEmits(["change", "update:modelValue"]);

const { activeNames, setActiveNames, handleItemClick } = useCollapse(
  props,
  emit
);

const { isActive, handleHeaderClick } = useCollapseItem({
  activeNames,
  handleItemClick,
});

defineExpose({
  /** @description active names */
  activeNames,
  /** @description set active names */
  setActiveNames,
});
</script>

<style lang="scss">
.collapse-container {
  .collapse-item {
    .collapse-item__header {
      width: 100%;
      padding: 0;
      border: none;
      display: flex;
      align-items: center;
      height: 48px;
      line-height: 48px;
      background-color: #fff;
      color: #303133;
      cursor: pointer;
      border-bottom: 1px solid #ebeef5;
      font-size: 13px;
      font-weight: 500;
      transition: border-bottom-color 0.3s;
      outline: none;

      .arrow-icon {
        margin: 0 8px;
        transition: transform 0.3s;
      }
    }

    &.is-active {
      border-radius: 4px;
      border: 1px solid #e4e7ed;
      .collapse-item__header {
        border-bottom-color: transparent;
        .arrow-icon {
          transform: rotate(90deg);
        }
      }

      & + .collapse-item.is-active {
        margin-top: 2px;
      }
    }
  }
}
</style>
