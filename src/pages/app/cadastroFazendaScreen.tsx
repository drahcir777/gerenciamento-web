import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';
import { Separator } from '../../components/ui/separator';
import { z } from 'zod';
import { registerFarm } from '@/api/register-farm';
import { cityMock, countryMock, stateMock } from '@/api/mocks/dados-mock';
import { toast } from 'sonner';

const registerFarmBodySchema = z.object({
  name: z.string(),
  city: z.string(),
  state: z.string(),
  country: z.string(),
  link: z.string(),
  consultantCpf: z.string(),
  livestock: z.string(),
  totalArea: z.number(),
  pastureArea: z.number(),
  animalCount: z.string(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
});

export type RegisterFarmForm = z.infer<typeof registerFarmBodySchema>;

export function CadastroFazenda() {
  const {
    register,
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<RegisterFarmForm>({
    resolver: zodResolver(registerFarmBodySchema),
    mode: 'onSubmit',
  });

  async function handleRegisterFarm(data: RegisterFarmForm) {
    try {
      const newData = {
        ...data,
        latitude: -23.55052,
        longitude: -46.633308,
      };

      await registerFarm(newData);
      toast.success('Fazenda cadastrado com sucesso!');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex w-[800px] flex-col rounded-lg border">
        <div className="flex h-10 items-center justify-start rounded-tl-sm rounded-tr-sm bg-primary px-6">
          <h2 className="text-background">Dados da fazenda</h2>
        </div>
        <h1 className="mt-6 px-4">Informações da Propriedade</h1>
        <Separator className="my-4" />
        <div className="flex flex-col justify-center px-4 pb-4">
          <form
            className="space-y-4"
            onSubmit={handleSubmit(handleRegisterFarm)}>
            <div className="flex flex-row space-x-4">
              <div className="w-full space-y-2">
                <Label htmlFor="name">Nome da fazenda *</Label>
                <Input {...register('name')} type="text" />
              </div>

              <div className="w-full space-y-2">
                <Label htmlFor="link">Seu Vínculo *</Label>
                <Controller
                  name="link"
                  control={control}
                  render={({ field: { name, onChange, value, disabled } }) => {
                    return (
                      <Select
                        name={name}
                        onValueChange={onChange}
                        value={value}
                        disabled={disabled}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="proprietario">
                              Proprietário
                            </SelectItem>
                            <SelectItem value="gerente">Gerente</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    );
                  }}
                />
              </div>

              <div className="w-full space-y-2">
                <Label htmlFor="livestock">Exploração Pecuária *</Label>
                <Controller
                  name="livestock"
                  control={control}
                  render={({ field: { name, onChange, value, disabled } }) => {
                    return (
                      <Select
                        name={name}
                        onValueChange={onChange}
                        value={value}
                        disabled={disabled}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="gado-de-corte">
                              Gado de Corte
                            </SelectItem>
                            <SelectItem value="gado-de-leite">
                              Gado de Leite
                            </SelectItem>
                            <SelectItem value="caprino">Caprino</SelectItem>
                            <SelectItem value="ovino">Ovino</SelectItem>
                            <SelectItem value="corte-cria-recria-engorda">
                              Corte: Cria, Recria e Engorda
                            </SelectItem>
                            <SelectItem value="corte-cria">
                              Corte: Cria
                            </SelectItem>
                            <SelectItem value="corte-cria-recria">
                              Corte: Cria e Recria
                            </SelectItem>
                            <SelectItem value="corte-recria">
                              Corte: Recria
                            </SelectItem>
                            <SelectItem value="corte-recria-engorda">
                              Corte: Recria e Engorda
                            </SelectItem>
                            <SelectItem value="corte-engorda">
                              Corte: Engorda
                            </SelectItem>
                            <SelectItem value="leite-producao-recria">
                              Leite: Produção Leiteira e Recria
                            </SelectItem>
                            <SelectItem value="leite-producao">
                              Leite: Produção Leiteira
                            </SelectItem>
                            <SelectItem value="leite-recria">
                              Leite: Recria
                            </SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    );
                  }}
                />
              </div>
            </div>

            <div className="flex w-full flex-row space-x-4">
              <div className="w-full space-y-2">
                <Label htmlFor="totalArea">Área total da fazenda (ha) *</Label>
                <Input
                  {...register('totalArea', { valueAsNumber: true })}
                  type="number"
                />
              </div>

              <div className="w-full space-y-2">
                <Label htmlFor="pastureArea">
                  Área total da pastagem (ha) *
                </Label>
                <Input {...register('pastureArea', { valueAsNumber: true })} />
              </div>

              <div className="w-full space-y-2">
                <Label htmlFor="animalCount">
                  Quantidade Aproximada de Animais
                </Label>
                <Controller
                  name="animalCount"
                  control={control}
                  render={({ field: { name, onChange, value, disabled } }) => {
                    return (
                      <Select
                        name={name}
                        onValueChange={onChange}
                        value={value}
                        disabled={disabled}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="1-100">1-100</SelectItem>
                            <SelectItem value="100-300">100-300</SelectItem>
                            <SelectItem value="300-500">300-500</SelectItem>
                            <SelectItem value="500-1000">500-1000</SelectItem>
                            <SelectItem value="1000-2000">1000-2000</SelectItem>
                            <SelectItem value="2000-3000">2000-3000</SelectItem>
                            <SelectItem value="3000-4000">3000-4000</SelectItem>
                            <SelectItem value="4000-5000">4000-5000</SelectItem>
                            <SelectItem value="5000-7000">
                              5.000-7.000
                            </SelectItem>
                            <SelectItem value="7000-10000">
                              7.000-10.000
                            </SelectItem>
                            <SelectItem value="10000-15000">
                              10.000-15.000
                            </SelectItem>
                            <SelectItem value="15000-20000">
                              15.000-20.000
                            </SelectItem>
                            <SelectItem value="20000-25000">
                              20.000-25.000
                            </SelectItem>
                            <SelectItem value="25000-30000">
                              25.000-30.000
                            </SelectItem>
                            <SelectItem value="30000-40000">
                              30.000-40.000
                            </SelectItem>
                            <SelectItem value="40000-50000">
                              40.000-50.000
                            </SelectItem>
                            <SelectItem value="acima-50000">
                              Acima de 50.000
                            </SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    );
                  }}
                />
              </div>
            </div>

            <h1 className="mt-6">Endereço</h1>
            <Separator className="my-4" />

            <div className="flex flex-row space-x-4">
              <div className="w-full space-y-2">
                <Label htmlFor="country">País</Label>
                <Controller
                  name="country"
                  control={control}
                  render={({ field: { name, onChange, value, disabled } }) => {
                    return (
                      <Select
                        name={name}
                        onValueChange={onChange}
                        value={value}
                        disabled={disabled}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {countryMock.map(country => {
                              return (
                                <SelectItem key={country} value={country}>
                                  {country}
                                </SelectItem>
                              );
                            })}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    );
                  }}
                />
              </div>

              <div className="w-full space-y-2">
                <Label htmlFor="state">Estado</Label>
                <Controller
                  name="state"
                  control={control}
                  render={({ field: { name, onChange, value, disabled } }) => {
                    return (
                      <Select
                        name={name}
                        onValueChange={onChange}
                        value={value}
                        disabled={disabled}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {stateMock.map(state => {
                              return (
                                <SelectItem key={state} value={state}>
                                  {state}
                                </SelectItem>
                              );
                            })}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    );
                  }}
                />
              </div>

              <div className="w-full space-y-2">
                <Label htmlFor="city">Cidade</Label>
                <Controller
                  name="city"
                  control={control}
                  render={({ field: { name, onChange, value, disabled } }) => {
                    return (
                      <Select
                        name={name}
                        onValueChange={onChange}
                        value={value}
                        disabled={disabled}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {cityMock.map(city => {
                              return (
                                <SelectItem key={city} value={city}>
                                  {city}
                                </SelectItem>
                              );
                            })}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    );
                  }}
                />
              </div>

              <div className="w-full space-y-2">
                <Label htmlFor="consultantCpf">Via de Acesso</Label>
                <Input {...register('consultantCpf')} />
              </div>
            </div>
            {/* <div className="space-y-2">
              <Label htmlFor="phone">Seu celular</Label>
              <Input id="phone" type="tel" />
            </div> */}

            <Button disabled={isSubmitting} className="w-full" type="submit">
              Finalizar cadastro
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
