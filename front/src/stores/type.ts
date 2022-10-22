export interface ChinaTotal {
	heal: number;
	showLocalConfirm: number;
	noInfectH5: number;
	localWzzAdd: number;
	mediumRiskAreaNum: number;
	importedCase: number;
	local_acc_confirm: number;
	nowLocalWzz: number;
	deadAdd: number;
	localConfirm: number;
	mRiskTime: string;
	dead: number;
	suspect: number;
	nowSevere: number;
	noInfect: number;
	showlocalinfeciton: number;
	confirmAdd: number;
	confirm: number;
	localConfirmH5: number;
	mtime: string;
	localConfirmAdd: number;
	highRiskAreaNum: number;
	nowConfirm: number;
}

export interface ChinaAdd {
	confirm: number;
	noInfect: number;
	localConfirm: number;
	noInfectH5: number;
	localConfirmH5: number;
	heal: number;
	dead: number;
	nowConfirm: number;
	suspect: number;
	nowSevere: number;
	importedCase: number;
}

export interface ShowAddSwitch {
	all: boolean;
	suspect: boolean;
	dead: boolean;
	heal: boolean;
	nowSevere: boolean;
	confirm: boolean;
	nowConfirm: boolean;
	importedCase: boolean;
	noInfect: boolean;
	localConfirm: boolean;
	localinfeciton: boolean;
}

export interface Today {
	confirm: number;
	isUpdated: boolean;
}

export interface Total {
	highRiskAreaNum: number;
	mtime: string;
	confirm: number;
	dead: number;
	showHeal: boolean;
	continueDayZeroLocalConfirm: number;
	adcode: string;
	showRate: boolean;
	heal: number;
	mediumRiskAreaNum: number;
	continueDayZeroLocalConfirmAdd: number;
	nowConfirm: number;
	wzz: number;
	provinceLocalConfirm: number;
}

export interface Today {
	confirmCuts: number;
	isUpdated: boolean;
	tip: string;
	wzz_add: number;
	local_confirm_add: number;
	abroad_confirm_add: number;
	dead_add: number;
	confirm: number;
}

export interface Total {
	nowConfirm: number;
	showHeal: boolean;
	mtime: string;
	showRate: boolean;
	confirm: number;
	dead: number;
	heal: number;
	wzz: number;
	provinceLocalConfirm: number;
	highRiskAreaNum: number;
	continueDayZeroConfirm: number;
	continueDayZeroLocalConfirmAdd: number;
	mediumRiskAreaNum: number;
	continueDayZeroConfirmAdd: number;
	adcode: string;
}

export interface Today {
	confirm: number;
	confirmCuts: number;
	isUpdated: boolean;
	wzz_add: number;
	local_confirm_add: number;
}

export interface Total {
	confirm: number;
	continueDayZeroLocalConfirmAdd: number;
	adcode: string;
	showRate: boolean;
	heal: number;
	highRiskAreaNum: number;
	mtime: string;
	nowConfirm: number;
	dead: number;
	wzz: number;
	provinceLocalConfirm: number;
	showHeal: boolean;
	mediumRiskAreaNum: number;
	continueDayZeroLocalConfirm: number;
}

export interface Children {
	name: string;
	adcode: string;
	date: string;
	today: Today;
	total: Total;
}

export interface Children {
	date: string;
	today: Today;
	total: Total;
	children: Children[];
	name: string;
	adcode: string;
}

export interface AreaTree {
	name: string;
	today: Today;
	total: Total;
	children: Children[];
}

export interface Diseaseh5Shelf {
	chinaTotal: ChinaTotal;
	chinaAdd: ChinaAdd;
	isShowAdd: boolean;
	showAddSwitch: ShowAddSwitch;
	areaTree: AreaTree[];
	lastUpdateTime: string;
}

export interface StatisGradeCityDetail {
	mtime: string;
	wzz_add: string;
	city: string;
	date: string;
	confirmAdd: number;
	confirm: number;
	dead: number;
	heal: number;
	grade: string;
	sdate: string;
	province: string;
	nowConfirm: number;
	syear: number;
}

export interface Data {
	diseaseh5Shelf: Diseaseh5Shelf;
	statisGradeCityDetail: StatisGradeCityDetail[];
}

export interface RootObject {
	ret: number;
	info: string;
	data: Data;
}

export interface OptionData {
  name: string;
  value: number[];
}