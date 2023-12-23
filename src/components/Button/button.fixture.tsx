import { useSelect } from 'react-cosmos/client';
import Button, { ButtonColors, ButtonSizes } from './index';
import { ButtonBrands } from './index';

export default {
  Playground: () => {
    const [size] = useSelect('size', {
      options: ButtonSizes,
      defaultValue: 'md',
    });
    const [color] = useSelect('color', {
      options: ButtonColors,
      defaultValue: 'primary',
    });
    const [brand] = useSelect('brand', {
      options: ButtonBrands,
      defaultValue: 'mfb',
    });
    const [disabled] = useSelect('disabled', {
      options: ['true', 'false'],
      defaultValue: 'false',
    });

    return (
      <div>
        <div className="tw-w-50 tw-mx-auto">
          <Button
            size={size}
            color={color}
            brand={brand}
            disabled={disabled === 'true'}
          >
            Primary
          </Button>
        </div>
      </div>
    );
  },
  Overview: () => {
    const [disabled] = useSelect('disabled', {
      options: ['true', 'false'],
      defaultValue: 'false',
    });

    return (
      <div>
        {ButtonSizes.map((size) => (
          <div className="tw-w-50 tw-mx-auto tw-mt-4">
            {ButtonBrands.map((brand) =>
              ButtonColors.map((color) => (
                <Button
                  className="tw-mx-2"
                  size={size}
                  color={color}
                  brand={brand}
                  disabled={disabled === 'true'}
                >
                  {brand} {color} {size}
                </Button>
              ))
            )}
          </div>
        ))}
      </div>
    );
  },
};
