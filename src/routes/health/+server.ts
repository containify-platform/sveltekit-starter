// The health check Containify polls before sending a new release traffic.
export function GET() {
	return new Response('ok');
}
