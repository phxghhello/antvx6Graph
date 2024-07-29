import { provide, ref, watch } from 'vue'

export const useCollapse = (
    props,
    emit
) => {
    const activeNames = ref(Array.isArray(props.modelValue) ? props.modelValue : [])

    const setActiveNames = (_activeNames = []) => {
        activeNames.value = _activeNames
        const value = props.accordion ? activeNames.value[0] : activeNames.value
        emit('update:modelValue', value)
        emit('change', value)
    }

    const handleItemClick = (name) => {
        if (props.accordion) {
            setActiveNames([activeNames.value[0] === name ? '' : name])
        } else {
            const _activeNames = [...activeNames.value]
            const index = _activeNames.indexOf(name)

            if (index > -1) {
                _activeNames.splice(index, 1)
            } else {
                _activeNames.push(name)
            }
            setActiveNames(_activeNames)
        }
    }

    watch(
        () => props.modelValue,
        () => (activeNames.value = Array.isArray(props.modelValue) ? props.modelValue : []),
        { deep: true }
    )

    return {
        activeNames,
        setActiveNames,
        handleItemClick
    }
}
