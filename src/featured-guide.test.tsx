import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { FeaturedGuide } from './components/featured-guide';

describe('inline featured guide', () => {
  it('starts in place only after a click without opening a dialog', () => {
    const { container } = render(<FeaturedGuide />);
    expect(container.querySelector('iframe')).toBeNull();
    fireEvent.click(screen.getByRole('button', { name: 'Play featured Northern Lands guide' }));
    expect(container.querySelector('.featured-inline-player iframe')).toHaveAttribute('src', expect.stringContaining('start=94&autoplay=1&playsinline=1'));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
  it('opens a selected chapter directly and keeps the external fallback', () => {
    const { container } = render(<FeaturedGuide />);
    fireEvent.click(screen.getByRole('button', { name: 'Play Bob the Frost Giant at 6:49' }));
    expect(container.querySelector('iframe')).toHaveAttribute('src', expect.stringContaining('start=409'));
    fireEvent.click(screen.getByRole('button', { name: 'Play Odin at 15:19' }));
    expect(container.querySelectorAll('iframe')).toHaveLength(1);
    expect(container.querySelector('iframe')).toHaveAttribute('src', expect.stringContaining('start=919'));
    expect(screen.getByRole('link', { name: 'Watch on YouTube' })).toHaveAttribute('href', expect.stringContaining('youtube.com/watch'));
  });
});
