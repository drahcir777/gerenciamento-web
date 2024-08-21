import { api } from "@/lib/axios";
import { RegisterFarmForm } from "@/pages/app/cadastroFazendaScreen";



export async function registerFarm(data: RegisterFarmForm) {

  return await api.post('/farm', data)
}