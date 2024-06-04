type SkinData = {
	uuid: string,
	texture: {
		signature: string,
		value: string,
		url: string
	}
}

type StatuePartKey = keyof Statue["parts"];
type Statue = {
	username: string,
	skin: string | null,
	parts: {
		headTopLeftBack : SkinData | null,
		headBottomLeftBack : SkinData | null,
		headTopRightBack : SkinData | null,
		headBottomRightBack : SkinData | null,
		headTopLeftFront : SkinData | null,
		headBottomLeftFront : SkinData | null,
		headTopRightFront : SkinData | null,
		headBottomRightFront : SkinData | null,
		armRightTop : SkinData | null,
		armRightMiddle : SkinData | null,
		armRightBottom : SkinData | null,
		armLeftTop : SkinData | null,
		armLeftMiddle : SkinData | null,
		armLeftBottom : SkinData | null,
		legRightTop : SkinData | null,
		legRightMiddle : SkinData | null,
		legRightBottom : SkinData | null,
		legLeftTop : SkinData | null,
		legLeftMiddle : SkinData | null,
		legLeftBottom : SkinData | null,
		chestTopRight : SkinData | null,
		chestMiddleRight : SkinData | null,
		chestBottomRight : SkinData | null,
		chestTopLeft : SkinData | null,
		chestMiddleLeft : SkinData | null,
		chestBottomLeft : SkinData | null,
	}
}