import { Checkbox } from '~/components/core/Checkbox'
import { useScalingAssociatedTokensContext } from './ScalingAssociatedTokensContext'

export function ExcludeAssociatedTokensCheckbox() {
  const { excludeAssociatedTokens, setExcludeAssociatedTokens } =
    useScalingAssociatedTokensContext()

  return (
    <Checkbox
      name="excludeAssociatedTokens"
      checked={excludeAssociatedTokens}
      onCheckedChange={(checked) => setExcludeAssociatedTokens(!!checked)}
      className="max-md:ml-4"
    >
      Exclude associated tokens
    </Checkbox>
  )
}
