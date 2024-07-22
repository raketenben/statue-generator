<script>
	import { CodeBlock } from "@skeletonlabs/skeleton";

	let examples = "#multiply the angle you want by 100 --> 90° = 9000";
</script>

<div class="card p-4 break-inside-avoid-column mb-5">
	<h2 class="p-2 h2 text-secondary-500">Commands</h2>
	<p class="p-2 pb-1 pt-2 text-md">Some commands to help you setup your statues.</p>
	<p class="p-2 pb-1 pt-6 text-sm text-secondary-500">Remove the nearest statue</p>
	<CodeBlock language="mcfunction" code={`/function statue:kill`} buttonCopied="✅"></CodeBlock>
	<p class="p-2 pb-1 pt-6 text-sm text-secondary-500">Disable posing through scoreboards</p>
	<p class="p-2 pb-1 pt-0 text-xs">( This way you can pose them with the Pose value in nbt )</p>
	<CodeBlock language="mcfunction" code={`/tag @e[sort=nearest,tag=main,limit=1] remove live`} buttonCopied="✅"></CodeBlock>
	<p class="p-2 pb-1 pt-6 text-sm text-secondary-500">Rotate the entire statue</p>
	<p class="p-2 pb-1 pt-0 text-xs">( Multiply the angle you want by 100 → 90° = 9000 )</p>
	<CodeBlock language="mcfunction" code={`/scoreboard players set @e[tag=statue,tag=main,sort=nearest,limit=1] statue_x 9000`} buttonCopied="✅"></CodeBlock>
	<p class="p-2 pb-1 pt-6 text-sm text-secondary-500">Rotate specific limbs</p>
	<p class="p-2 pb-1 pt-0 text-sm">All other limbs can be rotated in the same way, with the respective scoreboard names:</p>
	<CodeBlock language="mcfunction" code={`#head
statue_x_head
statue_y_head

#right arm
statue_x_ra
statue_y_ra

#left arm
statue_x_la
statue_y_la

#right leg
statue_x_rl
statue_y_rl

#left leg
statue_x_ll
statue_y_ll
`} buttonCopied="✅"></CodeBlock>
	<p class="p-2 pb-1 pt-6 text-sm text-secondary-500">Make statue hold items</p>
	<CodeBlock language="mcfunction" code={`/data merge entity @e[tag=statue,tag=main,limit=1,sort=nearest] {HandItems:[{id:"minecraft:stone_sword",Count:1b}]}`} buttonCopied="✅"></CodeBlock>
	
	<p class="p-2 pb-1 pt-6 text-sm text-secondary-500">Make statue wear armor</p>
	<CodeBlock language="mcfunction" code={`/data merge entity @e[tag=statue,tag=main,limit=1,sort=nearest] {ArmorItems:[{},{},{id:"minecraft:diamond_chestplate",Count:1b},{}]}`} buttonCopied="✅"></CodeBlock>

</div>
