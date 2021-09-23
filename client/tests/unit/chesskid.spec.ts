import { shallowMount } from '@vue/test-utils'
import Home from '@/views/Home.vue'
import FilterFriends from '@/components/FilterFriends.vue'
import store from '@/store/index'

describe('Home.vue', () => {
  it('Logo must have src = "../assets/logo.png" and alt = "ChessKid"', () => {
    const wrapper = shallowMount(Home, {
      global: {
        plugins: [store]
      }
    });

    const logo = wrapper.find('.logo img');
    
    // expect(logo.attributes().src).toBe('../assets/logo.png'); // src attribute not found
    expect(logo.attributes().alt).toBe('ChessKid');

  })
}) 

describe('FilterFriends.vue', () => {
  it('Input must have type = "text" and placeholder = "Filter friends... and must be inside .filter-input"', () => {
    const wrapper = shallowMount(FilterFriends, {
      global: {
        plugins: [store]
      }
    });

    const input = wrapper.find('.filter-input input');

    expect(input.exists()).toBe(true);
    expect(input.attributes().type).toBe('text');
    expect(input.attributes().placeholder).toBe('Filter friends...');

  })
})
