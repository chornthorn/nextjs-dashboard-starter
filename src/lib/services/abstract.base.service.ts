export abstract class BaseService<Req, Res> {
  abstract create(req: Req): Promise<Res>;
  abstract finds(): Promise<Res[]>;
  abstract find(id: number): Promise<Res>;
  abstract update(id: number, req: Req): Promise<Res>;
  abstract delete(id: number): Promise<Res>;
}
