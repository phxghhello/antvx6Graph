import { computed, inject, ref, unref } from 'vue'


export const useCollapseItem = ({ activeNames, handleItemClick }) => {
    const isActive = ({ name }) =>
        activeNames.value.includes(unref(name))

    const handleHeaderClick = ({ disabled, name }) => {
        if (disabled) return
        handleItemClick(unref(name))
    }

    return {
        isActive,
        handleHeaderClick
    }
}