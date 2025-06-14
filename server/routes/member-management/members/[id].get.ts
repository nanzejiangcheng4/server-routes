import type { Member, ReturnJSONMembers } from "@/interfaces";

export default defineEventHandler(async (event): Promise<ReturnJSONMembers> => {
  const params = event.context.params;
  // memberDB.tsを利用して会員リスト情報Mapオブジェクトを生成
  let memberList = new Map<number, Member>();
  const storage = useStorage();
  const memberListStorage = await storage.getItem(
    "local:member-management_members"
  );
  if (memberListStorage != undefined) {
    memberList = new Map<number, Member>(memberListStorage as any);
  }
  // ルートパラメータのidを数値変換
  const idNo = Number(params!.id);
  // ルートパラメータに該当する会員情報オブジェクトを取得
  const member = memberList.get(idNo) as Member;
  // 送信データオブジェクトをリターン
  return {
    result: 1,
    data: [member],
  };
});
